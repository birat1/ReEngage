import { useMutation, useQueryClient } from '@tanstack/react-query';
import { equipAvatar } from '../data';

export function useEquipAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarId) => equipAvatar(avatarId),
    onSuccess: () => {
      queryClient.invalidateQueries(['UserInfo']);
      queryClient.invalidateQueries(['EquippedAvatar']);
    },
    onError: (err) => {
      alert(err.response?.data?.error || 'Equip failed');
    },
  });
}
