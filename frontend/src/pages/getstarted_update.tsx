import { Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';

const GetStarted = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Optional Field
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !message) {
      setSuccess('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    if (phone) formData.append('phone', phone); // Only append if provided
    formData.append('message', message);

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      setSuccess(data.message || 'Email sent successfully!');

      // Clear form after success
      setFile(null);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error(error);
      setSuccess('There was an error sending the email.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-10 shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
              Ask us any Questions
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block font-medium text-lg">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="w-full px-5 py-3 rounded-lg border text-black text-lg" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium text-lg">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full px-5 py-3 rounded-lg border text-black text-lg" 
                />
              </div>
              {/* Optional Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block font-medium text-lg">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="w-full px-5 py-3 rounded-lg border text-black text-lg" 
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-medium text-lg">Message</label>
                <textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  rows={6} 
                  className="w-full px-5 py-3 rounded-lg border text-black text-lg" 
                />
              </div>

              {/* Optional File Upload Section */}
              <div>
                <label className="block font-medium text-lg">Document Upload (Optional)</label>
                
                {file ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-700 text-lg">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-36 flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-lg p-5 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition text-lg"
                  >
                    <Upload className="h-12 w-12" />
                    <span>Click to upload a file</span>
                  </button>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </div>

              {/* Submit Button & Loading Bar */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full px-6 py-4 text-xl font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Loading Bar */}
              {loading && (
                <div className="relative w-full h-2 bg-gray-300 rounded mt-3 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-500 animate-loading-bar"></div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <p className="mt-5 text-center text-lg font-medium text-green-600 animate-fade-out">
                  {success}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;