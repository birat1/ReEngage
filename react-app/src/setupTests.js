import '@testing-library/jest-dom';

// Create mock React components for testing
global.mockReactComponent = (name) => {
  const Component = (props) => <div data-testid={name} {...props} />;
  Component.displayName = name;
  return Component;
};

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Backpack: () => <div data-testid="backpack-icon" />,
  Store: () => <div data-testid="store-icon" />,
  // Add any other icons used in your components
}));

// Create a mock for axios
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
}));

// React Query mock
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: null,
  }),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }) => <div>{children}</div>,
}));

// Create a global mock for your hooks
global.mockPurchaseMutate = jest.fn();
global.mockEquipMutate = jest.fn();

jest.mock('./components/AvatarShop/hooks/usePurchaseAvatar', () => ({
  usePurchaseAvatar: () => ({
    mutate: global.mockPurchaseMutate,
    isLoading: false,
    variables: null,
  }),
}));

jest.mock('./components/AvatarShop/hooks/useEquipAvatar', () => ({
  useEquipAvatar: () => ({
    mutate: global.mockEquipMutate,
    isLoading: false,
    variables: null,
  }),
}));

// Mock CheckLoginStatus
jest.mock('./components/Authentication/CheckLoginStatus', () => ({
  getUserInfo: jest.fn(),
  isLoggedIn: jest.fn().mockReturnValue(true),
}));
