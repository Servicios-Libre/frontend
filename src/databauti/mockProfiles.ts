import { UserProfile } from '@/services/profileService';

export const completeProfile: UserProfile = {
  phone: '123456789',
  user_pic: 'https://example.com/profile.jpg',
  street: 'Main Street',
  house_number: '123',
  city: 'New York',
  state: 'NY',
  zip_code: '10001',
};

export const incompleteProfile: UserProfile = {
  phone: '',
  user_pic: '',
  street: 'Main Street',
  house_number: '',
  city: 'New York',
  state: '',
  zip_code: '10001',
};
