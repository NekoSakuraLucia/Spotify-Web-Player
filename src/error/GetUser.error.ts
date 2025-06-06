const getUserError = (status: number): string => {
    let ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูล';
    switch (status) {
        case 401:
            ErrorMessage = 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน';
            break;
        case 403:
            ErrorMessage =
                'ไม่สามารถเข้าถึงข้อมูลผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง';
            break;
        case 429:
            ErrorMessage = 'คุณทำการร้องขอเกินขีดจำกัด กรุณาลองใหม่ในภายหลัง';
            break;
        default:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ กรุณาลองใหม่อีกครั้ง';
            break;
    }

    return ErrorMessage;
};

export { getUserError };
