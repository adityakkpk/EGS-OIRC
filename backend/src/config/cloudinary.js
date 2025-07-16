import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'conference-papers', // Folder in your Cloudinary account
    allowed_formats: ['pdf', 'docx', 'tex', 'latex'],
    resource_type: 'auto',
    public_id: (req, file) => {
      // Generate unique filename
      const timestamp = Date.now();
      const filename = file.originalname.split('.')[0];
      return `paper_${timestamp}_${filename}`;
    },
  },
});

// Create multer upload middleware for documents (speakers)
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type - Allow PDF, DOCX, and LaTeX files
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/octet-stream', // Sometimes DOCX files are sent as this
      'text/x-tex', // .tex
      'application/x-tex', // .tex
      'text/plain', // .tex files are sometimes detected as plain text
      'application/x-latex', // .latex files
      'text/x-latex' // .latex files
    ];
    
    const allowedExtensions = ['.pdf', '.docx', '.tex', '.latex'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    console.log('File upload attempt:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      extension: fileExtension
    });
    
    // Check both MIME type and file extension for maximum compatibility
    const mimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);
    const extensionAllowed = allowedExtensions.includes(fileExtension);
    
    if (mimeTypeAllowed || extensionAllowed) {
      cb(null, true);
    } else {
      console.log('File rejected:', {
        filename: file.originalname,
        mimetype: file.mimetype,
        extension: fileExtension
      });
      cb(new Error('Only PDF, DOCX, and LaTeX (.tex, .latex) files are allowed!'), false);
    }
  }
});

// Create separate storage for keynote speakers (supports multiple file types)
const keynoteStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = 'keynote-speakers';
    let allowedFormats = [];
    
    if (file.fieldname === 'cvFile') {
      folder = 'keynote-speakers/cv';
      allowedFormats = ['pdf', 'docx', 'tex', 'latex'];
    } else if (file.fieldname === 'photoFile') {
      folder = 'keynote-speakers/photos';
      allowedFormats = ['jpg', 'jpeg', 'png'];
    } else if (file.fieldname === 'presentationFile') {
      folder = 'keynote-speakers/presentations';
      allowedFormats = ['pdf', 'ppt', 'pptx'];
    }
    
    return {
      folder: folder,
      allowed_formats: allowedFormats,
      resource_type: 'auto',
      public_id: `${file.fieldname}_${Date.now()}_${file.originalname.split('.')[0]}`
    };
  }
});

// Create multer upload middleware for keynote speakers
export const keynoteUpload = multer({
  storage: keynoteStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('Keynote file upload attempt:', {
      fieldname: file.fieldname,
      filename: file.originalname,
      mimetype: file.mimetype
    });
    
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (file.fieldname === 'cvFile') {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/octet-stream',
        'text/x-tex',
        'application/x-tex',
        'text/plain',
        'application/x-latex',
        'text/x-latex'
      ];
      const allowedExts = ['.pdf', '.docx', '.tex', '.latex'];
      
      if (allowedTypes.includes(file.mimetype) || allowedExts.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error('CV must be PDF, DOCX, or LaTeX format!'), false);
      }
    } else if (file.fieldname === 'photoFile') {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const allowedExts = ['.jpg', '.jpeg', '.png'];
      
      if (allowedTypes.includes(file.mimetype) || allowedExts.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error('Photo must be JPG, JPEG, or PNG format!'), false);
      }
    } else if (file.fieldname === 'presentationFile') {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      const allowedExts = ['.pdf', '.ppt', '.pptx'];
      
      if (allowedTypes.includes(file.mimetype) || allowedExts.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error('Presentation must be PDF, PPT, or PPTX format!'), false);
      }
    } else {
      cb(new Error('Unknown file field!'), false);
    }
  }
});

export default cloudinary; 