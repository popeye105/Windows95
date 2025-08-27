import React, { useState } from 'react';

const MailWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setSubmitStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      setSubmitStatus('Name and Email required');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Sending message...');

    try {
      // Using Formspree for form submission
      const response = await fetch('https://formspree.io/f/xdkogkqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          _replyto: formData.email,
          _subject: `New message from ${formData.name} - Windows 95 Portfolio`
        })
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully! ✓');
        setTimeout(() => {
          handleClear();
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-win95-gray p-4">
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-4 text-center">Mail Me</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-inset bg-white text-black"
              placeholder="Your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-inset bg-white text-black"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-bold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-inset bg-white text-black"
              placeholder="Your phone number"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-bold mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              className="w-full p-2 border-2 border-inset bg-white text-black resize-none"
              placeholder="Type your message here..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="win95-button px-6 py-2 font-bold text-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : '📤 Submit'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="win95-button px-6 py-2 font-bold text-sm"
            >
              🗑️ Clear
            </button>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div className={`text-center text-xs mt-3 p-1 ${
              submitStatus.includes('successfully') 
                ? 'text-green-600' 
                : submitStatus.includes('Failed') || submitStatus.includes('required')
                ? 'text-red-600'
                : 'text-blue-600'
            }`}>
              {submitStatus}
            </div>
          )}
        </form>

        {/* Instructions */}
        <div className="mt-6 p-3 border-2 border-inset bg-gray-100">
          <h3 className="text-sm font-bold mb-2">📋 Instructions:</h3>
          <ul className="text-xs space-y-1">
            <li>• Fill in your details and message</li>
            <li>• Click Submit to send your message</li>
            <li>• Use Clear to reset all fields</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MailWindow;
