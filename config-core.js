// Core configuration loader for ETC platform v4
// Handles analytics initialization and PWA service worker registration
// DO NOT MODIFY THIS FILE MANUALLY

(function() {
    // Daftar domain resmi yang diizinkan
    const ALLOWED_DOMAINS = ['etc-07.github.io', 'elitetradingcircle.com']; 
    
    const currentHost = window.location.hostname;
    
    // Izinkan localhost saat development/testing
    if (currentHost === 'localhost' || currentHost === '127.0.0.1' || currentHost === '') {
        return; 
    }
    
    // Cek apakah domain saat ini ada di daftar allowed
    const isAuthorized = ALLOWED_DOMAINS.some(domain => currentHost.includes(domain));
    
    if (!isAuthorized) {
        // Jika bukan domain resmi, aktifkan proteksi
        document.body.innerHTML = ''; 
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #000000; color: #ff0000; z-index: 999999;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Courier New', monospace; text-align: center; padding: 20px;
            user-select: none; -webkit-user-select: none;
        `;
        
        overlay.innerHTML = `
            <h1 style="font-size: 3rem; margin-bottom: 20px; text-shadow: 0 0 10px red;">⚠️ PELANGGARAN HAK CIPTA TERDETEKSI</h1>
            <p style="font-size: 1.5rem; max-width: 800px; line-height: 1.6;">
                Akun Anda telah ditandai karena mencoba menyalin dan menjalankan 
                <strong>Elite Trading Circle</strong> secara ilegal.<br><br>
                Sistem keamanan kami telah mencatat IP Address dan perangkat Anda.<br>
                Tindakan hukum akan segera diproses oleh tim legal kami.
            </p>
            <p style="margin-top: 40px; font-size: 1rem; opacity: 0.7; border-top: 1px solid #333; padding-top: 20px;">
                Contact Legal: admin@elitetradingcircle.com<br>
                Case ID: ${Math.random().toString(36).substring(7).toUpperCase()}
            </p>
        `;
        
        document.documentElement.appendChild(overlay);
        
        // Cegah klik kanan & inspect element dasar
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
            }
        });
    }
})();