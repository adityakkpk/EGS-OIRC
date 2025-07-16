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

// Create multer upload middleware
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
      'text/x-tex', // .tex
      'application/x-tex', // .tex
      'text/plain' // .tex files are sometimes detected as plain text
    ];
    
    const allowedExtensions = ['.pdf', '.docx', '.tex', '.latex'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, and LaTeX (.tex, .latex) files are allowed!'), false);
    }
  }
});

export default cloudinary; 