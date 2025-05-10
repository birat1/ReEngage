import { useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseAvatar } from '../data';

export const usePurchaseAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarId) => purchaseAvatar(avatarId),
    onSuccess: () => {
      queryClient.invalidateQueries(['UserInfo']);
      queryClient.invalidateQueries(['avatars']);
    },
    onError: (err) => {
      alert(err.response?.data?.error || 'Purchase failed');
    },
  });
};
