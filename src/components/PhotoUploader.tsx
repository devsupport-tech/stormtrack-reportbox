
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X, Image, Maximize2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { cn } from '@/lib/utils';
import { itemFade, staggerChildren } from '@/utils/animations';

interface Photo {
  id: string;
  file: File;
  url: string;
  notes: string;
  uploadProgress: number;
}

const PhotoUploader = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };
  
  const processFiles = (files: File[]) => {
    if (photos.length + files.length > 100) {
      toast({ 
        title: "Too many photos",
        description: "Maximum of 100 photos allowed per project.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    const newPhotos = files.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      url: URL.createObjectURL(file),
      notes: '',
      uploadProgress: 0
    }));
    
    setPhotos(prev => [...prev, ...newPhotos]);
    
    // Simulate upload progress
    const simulateUpload = () => {
      setPhotos(currentPhotos => 
        currentPhotos.map(photo => {
          if (newPhotos.some(newPhoto => newPhoto.id === photo.id) && photo.uploadProgress < 100) {
            return {
              ...photo,
              uploadProgress: Math.min(photo.uploadProgress + Math.random() * 20, 100)
            };
          }
          return photo;
        })
      );
      
      const allCompleted = photos.every(photo => photo.uploadProgress === 100);
      
      if (!allCompleted) {
        setTimeout(simulateUpload, 300);
      } else {
        setIsUploading(false);
        
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${newPhotos.length} photo${newPhotos.length > 1 ? 's' : ''}.`,
        });
      }
    };
    
    setTimeout(simulateUpload, 500);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  
  const handleDragLeave = () => {
    setDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    
    toast({
      title: "Photo Removed",
      description: "The photo has been removed from the project.",
    });
  };
  
  const handleNotesChange = (id: string, notes: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, notes } : photo
    ));
  };
  
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setPreviewOpen(true);
    setZoomLevel(1);
    setRotation(0);
  };
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  return (
    <div className="space-y-6">
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.div 
          className="space-y-4"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemFade}>
            <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
              <UploadCloud 
                className={cn(
                  "h-8 w-8 mx-auto transition-transform duration-300",
                  dragOver ? "text-primary scale-110" : "text-muted-foreground"
                )}
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemFade} className="space-y-2">
            <h3 className="text-lg font-medium">Upload Photos</h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop your photos here, or click to browse
            </p>
          </motion.div>
          
          <motion.div variants={itemFade}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <CustomButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="lg"
              icon={<Image className="h-4 w-4" />}
            >
              Browse Photos
            </CustomButton>
          </motion.div>
          
          <motion.div variants={itemFade}>
            <p className="text-xs text-muted-foreground">
              Maximum 100 photos, 10MB each (JPG, PNG)
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Uploaded Photos ({photos.length}/100)
            </h3>
            
            {isUploading && (
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="animate-pulse mr-2">Uploading...</span>
              </div>
            )}
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  variants={itemFade}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group rounded-lg border overflow-hidden bg-background elegant-shadow transition-all duration-200 hover:elegant-shadow-lg"
                >
                  <div className="relative aspect-square">
                    <img 
                      src={photo.url} 
                      alt={`Photo ${index + 1}`} 
                      className="w-full h-full object-cover transition-all duration-200 group-hover:scale-105"
                      onClick={() => handlePhotoClick(photo)}
                    />
                    <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm rounded-full h-6 w-6 flex items-center justify-center font-medium text-xs">
                      {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm text-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={() => handlePhotoClick(photo)}
                    >
                      <Maximize2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  {photo.uploadProgress < 100 && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                      <p className="text-sm mb-2">Uploading...</p>
                      <Progress value={photo.uploadProgress} className="w-full" />
                    </div>
                  )}
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">Photo {index + 1}</span>
                      {photo.notes && (
                        <span className="text-xs text-muted-foreground">With notes</span>
                      )}
                    </div>
                    <textarea
                      value={photo.notes}
                      onChange={(e) => handleNotesChange(photo.id, e.target.value)}
                      placeholder="Add notes for this photo..."
                      className="w-full text-xs p-2 border rounded-md resize-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      rows={2}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-lg">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Photo Preview</DialogTitle>
            <DialogDescription>
              {selectedPhoto && photos.findIndex(p => p.id === selectedPhoto.id) + 1} of {photos.length}
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
            {selectedPhoto && (
              <div className="h-full flex items-center justify-center p-4">
                <img
                  src={selectedPhoto.url}
                  alt="Preview"
                  className="max-h-full object-contain transition-all duration-200"
                  style={{ 
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    maxWidth: '100%'
                  }}
                />
              </div>
            )}
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <button 
                className="bg-background/80 backdrop-blur-sm border rounded-full p-2 transition-all duration-200 hover:bg-accent"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button 
                className="bg-background/80 backdrop-blur-sm border rounded-full p-2 transition-all duration-200 hover:bg-accent"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button 
                className="bg-background/80 backdrop-blur-sm border rounded-full p-2 transition-all duration-200 hover:bg-accent"
                onClick={handleRotate}
              >
                <RotateCw className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {selectedPhoto && (
            <div className="p-4 border-t">
              <Label htmlFor="preview-notes" className="text-sm font-medium mb-2 block">
                Photo Notes
              </Label>
              <Textarea
                id="preview-notes"
                value={selectedPhoto.notes}
                onChange={(e) => handleNotesChange(selectedPhoto.id, e.target.value)}
                placeholder="Add detailed notes for this photo..."
                className="w-full resize-none"
                rows={3}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoUploader;
