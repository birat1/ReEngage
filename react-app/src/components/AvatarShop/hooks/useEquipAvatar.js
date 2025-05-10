import { useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseAvatar, equipAvatar } from '../data';

export function useEquipAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarId) => equipAvatar(avatarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['EquippedAvatar'] });
    },
  });
}
