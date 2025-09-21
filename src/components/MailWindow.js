import React, { useState, useEffect } from 'react';

const MailWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
    
    if (!formData.name || !formData.email) {
      setSubmitStatus('Name and Email required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Sending message...');

    try {
      const response = await fetch('https://formspree.io/f/mjkabyqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'No message provided',
          _replyto: formData.email,
          _subject: `New message from ${formData.name} - Windows 95 Portfolio`
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        setSubmitStatus('Message sent successfully ✓');
        setTimeout(() => {
          handleClear();
        }, 2000);
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        
        if (response.status === 422) {
          setSubmitStatus('Form validation failed. Please check your inputs.');
        } else if (response.status === 403) {
          setSubmitStatus('Form not properly configured. Contact administrator.');
        } else if (response.status === 429) {
          setSubmitStatus('Too many requests. Please wait and try again.');
        } else {
          setSubmitStatus(`Server error (${response.status}). Please try again later.`);
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitStatus('Network error. Please check your internet connection.');
      } else if (error.name === 'AbortError') {
        setSubmitStatus('Request timed out. Please try again.');
      } else {
        setSubmitStatus('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-win95-gray overflow-hidden">
      <div className={`flex-1 flex flex-col ${isMobile ? 'p-2' : 'p-4'} min-h-0`}>
        <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${isMobile ? 'mb-2' : 'mb-4'} text-center flex-shrink-0`}>Mail Me</h2>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className={`flex-1 ${isMobile ? 'space-y-2' : 'space-y-3'} overflow-auto ${isMobile ? 'pb-2' : ''}`}>
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full ${isMobile ? 'p-1.5' : 'p-2'} border-2 border-inset bg-white text-black text-sm`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full ${isMobile ? 'p-1.5' : 'p-2'} border-2 border-inset bg-white text-black text-sm`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full ${isMobile ? 'p-1.5' : 'p-2'} border-2 border-inset bg-white text-black text-sm`}
              />
            </div>

            <div className="flex-1 flex flex-col min-h-0" style={{ minHeight: isMobile ? '120px' : '200px' }}>
              <label className="block text-sm font-bold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full flex-1 ${isMobile ? 'p-1.5' : 'p-2'} border-2 border-inset bg-white text-black resize-none text-sm`}
                style={{ minHeight: isMobile ? '100px' : '180px' }}
              />
            </div>
          </div>

          <div className={`flex gap-2 justify-center ${isMobile ? 'mt-2' : 'mt-4'} flex-shrink-0 ${isMobile ? 'pb-2' : ''}`} style={isMobile ? { marginBottom: '20px' } : {}}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`win95-button ${isMobile ? 'px-4 py-1.5' : 'px-6 py-2'} font-bold text-xs disabled:opacity-50`}
            >
              {isSubmitting ? 'Sending...' : '📤 Submit'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`win95-button ${isMobile ? 'px-4 py-1.5' : 'px-6 py-2'} font-bold text-xs`}
            >
              🗑️ Clear
            </button>
          </div>

          {submitStatus && submitStatus.includes('required') && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-win95-gray border-2 border-outset p-4 shadow-lg max-w-xs w-full mx-4">
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
            </div>
          )}
          
          {submitStatus && !submitStatus.includes('required') && (
            <div className={`text-center text-xs ${isMobile ? 'mt-1' : 'mt-2'} p-1 flex-shrink-0 ${
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
