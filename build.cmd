:nova88
cd apps/nova88
rmdir /s/q public
rmdir /s/q .cache
mkdir public
xcopy /s static public
cd ../../
goto :eof