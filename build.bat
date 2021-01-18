goto %1

:buildNova88
cd apps/nova88
rmdir /s/q public
rmdir /s/q .cache
mkdir public
rmdir /s/q static\styles
xcopy /s /i src\styles static\styles
@REM xcopy /s static public
cd ../../
goto :eof

:serveNova88
cd apps/nova88
rmdir /s/q static\styles
xcopy /s /i src\styles static\styles
@REM xcopy /s static public
cd ../../
goto :eof

:buildGoal123
cd apps/goal123
rmdir /s/q public
rmdir /s/q .cache
mkdir public
rmdir /s/q static\styles
xcopy /s /i src\styles static\styles
cd ../../
goto :eof

:serveGoal123
cd apps/goal123
rmdir /s/q static\styles
xcopy /s /i src\styles static\styles
@REM xcopy /s static public
cd ../../
goto :eof

:buildBwing
cd apps/bwing
rmdir /s/q public
rmdir /s/q .cache
mkdir public
rmdir /s/q static\styles
xcopy /s /i src\styles static\styles
cd ../../
goto :eof

:serveBwing
cd apps/bwing
rmdir /s/q static\styles
xcopy /s /i src\styles static\styles
@REM xcopy /s static public
cd ../../
goto :eof