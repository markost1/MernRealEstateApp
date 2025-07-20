export const uploadImageToCloudinary = async (file, cloudName, uploadPreset) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_Name', cloudName)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error.message || 'Upload failed');
  }

  return data.secure_url;  // vraća URL slike
};
