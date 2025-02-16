@echo off
cd "C:\Users\14308757\OneDrive - UTS (1)\Documents\GitHub\UncertainScenarios"
xcopy /E /Y "C:\Users\14308757\Downloads\bolt_new_export\*" .
git add .
git commit -m "Auto-update from latest BOLT.NEW export"
git push origin main
echo Update complete!
pause
