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
    <div className="h-full flex flex-col bg-win95-gray overflow-hidden">
      <div className="flex-1 flex flex-col p-4 min-h-0">
        <h2 className="text-lg font-bold mb-4 text-center flex-shrink-0">Mail Me</h2>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 space-y-3 overflow-auto">
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
            <div className="flex-1 flex flex-col min-h-0">
              <label className="block text-sm font-bold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full flex-1 p-2 border-2 border-inset bg-white text-black resize-none min-h-0"
                placeholder="Type your message here..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center mt-4 flex-shrink-0">
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
          {submitStatus && submitStatus.includes('required') && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-win95-gray border-2 border-outset p-4 shadow-lg z-50">
              <div className="text-center">
                <div className="text-sm font-bold text-red-600 mb-2">⚠️ Error</div>
                <div className="text-sm mb-3">{submitStatus}</div>
                <button
                  onClick={() => setSubmitStatus('')}
                  className="win95-button px-4 py-1 text-sm"
                >
                  OK
                </button>
              </div>
            </div>
          )}
          
          {submitStatus && !submitStatus.includes('required') && (
            <div className={`text-center text-xs mt-2 p-1 flex-shrink-0 ${
              submitStatus.includes('successfully') 
                ? 'text-green-600' 
                : submitStatus.includes('Failed')
                ? 'text-red-600'
                : 'text-blue-600'
            }`}>
              {submitStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MailWindow;
