import { useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseAvatar } from '../data';

export const usePurchaseAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarId) => purchaseAvatar(avatarId),
    onSuccess: (data) => {
      queryClient.setQueryData(['userInfo'], (old) => ({
        ...old,
        points: data.new_points,
        owned_avatars: [...old.owned_avatars, data.purchased_avatar],
      }));
    },
    onError: (err) => {
      alert(err.response?.data?.error || 'Purchase failed');
    },
  });
};
