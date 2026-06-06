const SESSION_KEY = import.meta.env.VITE_SESSION_KEY;

// Nên chuyển sang biến môi trường Vite:
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

/**
 * Kiểm tra mật khẩu và tạo session.
 * Session chỉ tồn tại trong tab hiện tại.
 */
export function login(password: string): boolean {
  if (password !== USER_PASSWORD) {
    return false;
  }

  sessionStorage.setItem(SESSION_KEY, "authenticated");
  return true;
}

/**
 * Xóa session.
 */
export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Kiểm tra trạng thái đăng nhập.
 */
export function isAuthenticated(): boolean {
  return (
    sessionStorage.getItem(SESSION_KEY) === "authenticated"
  );
}