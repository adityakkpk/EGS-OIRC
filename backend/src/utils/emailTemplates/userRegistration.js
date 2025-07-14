export const welcomeTemplate = (userData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>Hello ${userData.name}!</h1>
    <p>Welcome to the ICMMCS 2025!</p>
    <p>We'd love to have you join us!</p>
    <br/>
    <p>Best regards,</p>
    <p>ICMMCS Team</p>
  </div>
`;

export const adminNotificationTemplate = (userData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>${userData.name} Registered for the Conference!</h1>
    <p>Registration Details:</p>
    <ul>
      <li>Name: ${userData.name}</li>
      <li>Email: ${userData.email}</li>
      <li>Phone: ${userData.phone}</li>
    </ul>
    <br/>
    <p>Best regards,</p>
    <p>ICMMCS Team</p>
  </div>
`;

export const speakerConfirmationTemplate = (speakerData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>Welcome to ICMMCS 2025, ${speakerData.name}!</h1>
    <p>Thank you for submitting your paper for ICMMCS 2025. We're excited to have you share your research with us!</p>
    
    <h2>Your Submission Details:</h2>
    <ul>
      <li>Paper Title: ${speakerData.paperTitle}</li>
      <li>Institution: ${speakerData.institutionName}</li>
      <li>Conference: ${speakerData.conferenceTitle}</li>
      <li>Conference Date & Location: ${speakerData.placeDate}</li>
      <li>Attendee Type: ${speakerData.attendeeType}</li>
      <li>Country: ${speakerData.country}</li>
      ${speakerData.fileUrl ? `<li>Paper File: <a href="${speakerData.fileUrl}">View Uploaded Document</a></li>` : ''}
    </ul>

    <h2>Important Dates:</h2>
    <ul>
      <li>Conference Dates: November 10-11, 2025</li>
      <li>Paper Submission Deadline: October 1, 2025</li>
      <li>Review Notification: October 15, 2025</li>
    </ul>

    <p>Next Steps:</p>
    <ol>
      <li>Our team will review your submission</li>
      <li>You will receive a notification about the status of your paper</li>
      <li>If accepted, you'll receive further instructions about presentation details</li>
    </ol>

    <p>If you have any questions, please don't hesitate to contact us at info@icmmcs.org</p>
    
    <br/>
    <p>Best regards,</p>
    <p>ICMMCS Team</p>
  </div>
`;

export const speakerAdminNotificationTemplate = (speakerData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>New Paper Submission</h1>
    <p>A new paper has been submitted for ICMMCS 2025.</p>
    
    <h2>Speaker Details:</h2>
    <ul>
      <li>Name: ${speakerData.name}</li>
      <li>Email: ${speakerData.email}</li>
      <li>Phone: ${speakerData.phone}</li>
      <li>Institution: ${speakerData.institutionName}</li>
      <li>Country: ${speakerData.country}</li>
    </ul>

    <h2>Paper Information:</h2>
    <ul>
      <li>Title: ${speakerData.paperTitle}</li>
      <li>Conference: ${speakerData.conferenceTitle}</li>
      <li>Conference Date & Location: ${speakerData.placeDate}</li>
      <li>Attendee Type: ${speakerData.attendeeType}</li>
      <li>File: ${speakerData.fileUrl ? `<a href="${speakerData.fileUrl}">View Uploaded Document</a>` : 'Not provided'}</li>
    </ul>

    <h3>Message:</h3>
    <p>${speakerData.message}</p>

    <p>Please review the submission and follow up with the speaker if needed.</p>
    
    <br/>
    <p>Best regards,</p>
    <p>ICMMCS System</p>
  </div>
`;

export const sponsorConfirmationTemplate = (sponsorData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>Welcome to ICMMCS 2025, ${sponsorData.name}!</h1>
    <p>Thank you for registering as a ${sponsorData.level} sponsor for ICMMCS 2025. We're thrilled to have you as our partner!</p>
    
    <h2>Sponsorship Details:</h2>
    <ul>
      <li>Level: ${sponsorData.level.toUpperCase()}</li>
      <li>Amount: ${sponsorData.amount}</li>
    </ul>

    <h2>Next Steps:</h2>
    <ol>
      <li>Our team will contact you shortly with payment instructions</li>
      <li>Once payment is confirmed, we'll send you the sponsorship package</li>
      <li>We'll work with you to ensure your brand gets maximum visibility at the conference</li>
    </ol>

    <h2>Sponsorship Benefits:</h2>
    <ul>
      <li>Brand visibility at the conference</li>
      <li>Logo placement on conference materials</li>
      <li>Complimentary conference passes</li>
      <li>Exhibition space (as per sponsorship level)</li>
    </ul>

    <p>If you have any questions, please contact us at info@icmmcs.org</p>
    
    <br/>
    <p>Best regards,</p>
    <p>ICMMCS Team</p>
  </div>
`;

export const sponsorAdminNotificationTemplate = (sponsorData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>New Sponsor Registration</h1>
    <p>A new sponsor has registered for ICMMCS 2025.</p>
    
    <h2>Sponsor Details:</h2>
    <ul>
      <li>Organization Name: ${sponsorData.name}</li>
      <li>Email: ${sponsorData.email}</li>
      <li>Sponsorship Level: ${sponsorData.level.toUpperCase()}</li>
      <li>Amount: ${sponsorData.amount}</li>
    </ul>

    <p><strong>Action Required:</strong> Please follow up with payment instructions and sponsorship package details.</p>
    
    <br/>
    <p>Best regards,</p>
    <p>ICMMCS System</p>
  </div>
`;