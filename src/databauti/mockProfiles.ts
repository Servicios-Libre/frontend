import { UserProfile } from '@/types/index';

export const completeProfile: UserProfile = {
  address_id: {
    street: 'Main Street',
    house_number: '123',
    city: 'New York',
    state: 'NY',
    zip_code: '10001',
  },
  name: 'John Doe',
  phone: '123456789',
  user_pic: 'https://example.com/profile.jpg',
};

export const incompleteProfile: UserProfile = {
  address_id: {
    street: 'Main Street',
    house_number: '',
    city: 'New York',
    state: '',
    zip_code: '10001',
  },
  name: '',
  phone: '',
  user_pic: '',
};
