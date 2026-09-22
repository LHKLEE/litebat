@echo off
chcp 65001 >nul
fltmc >nul 2>&1 || (powershell -Command "Start-Process cmd -ArgumentList '/c ""%~s0""' -Verb RunAs" & exit)

echo.
echo        以太网重置工具
echo.
echo  正在禁用适配器...
wmic path win32_networkadapter where DeviceID="11" call disable >nul 2>&1

echo  等待1秒...
timeout /t 1 /nobreak >nul

echo  正在启用适配器...
wmic path win32_networkadapter where DeviceID="11" call enable >nul 2>&1

echo.
echo  [完成] 操作执行完毕！
echo.
timeout /t 1 /nobreak >nul
exit
