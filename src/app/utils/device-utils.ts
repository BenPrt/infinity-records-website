export class DeviceUtils {
  static isMobile(): boolean {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)) {
      return true;
    }
    return false;
  }
}
