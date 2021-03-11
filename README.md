<p align="center">
  <img alt="Crocodic" src="./misc/images/crocodic.png" width=250/>
</p>

<p align="center">
  <img alt="React Native" src="https://img.shields.io/badge/react_native%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

# React Native Starter


## Environment

- Visual Studio Code
- Android Studio ```<X.Y.Z>```
- XCode ```<X.Y>```
- JDK ```<X>```
- Node.JS ```<X.Y.Z>```

## Clone Project

Buka **terminal / cmd**, masuk ke folder yang diinginkan, lalu jalan kan ```git clone <LINK_GIT>```


## Running


#### First Time Running

Karena folder node_modules tidak ikut dalam repositori git, setelah clone perlu install, Buka **terminal / cmd** arahkan posisi folder ke folder project React Native Starter, jalankan ```npm install```

Untuk MacOS ```cd ios``` dan install pod jalankan ```pod install``` lalu kembali ke folder project lagi ```cd ..```

#### Start React-Native Packager

Buka **terminal / cmd** arahkan posisi folder ke folder project React Native Starter, jalankan ```npm start```

#### Run On Android

1. Hubungkan device android dengan USB
2. Aktifkan **opsi pengembang** di device android
3. Aktifkan opsi **USB Debugging**
4. Start React-Native Packager jika belum
5. Buka jendela **terminal / cmd** lain, arahkan posisi folder ke folder project React Native Starter, jalankan ```npx react-native run-android```

#### Run On iOS

1. Start React-Native Packager jika belum
5. Buka jendela **terminal / cmd** lain, arahkan posisi folder ke folder project React Native Starter, jalankan ```npx react-native run-ios```


## Set-Up EsLint

EsLint membantu untuk menyatakan peraturan - peraturan penulisan code, ini membuat kode lebih disiplin penulisannya dan lebih konsisten.

Anda dapat mengubah konfigurasi peraturannya di ```.eslintrc.js```, dan agar peraturan EsLint dapat berjalan, anda terlebih dahulu harus menginstall ekstensi [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Setelah terinstal, buka salah satu file javascript atau typescript, lihat di bagian bawah kanan visual studio code terdapat button bertuliskan EsLint, pastikan tercentang yang berarti menandakan bahwa ekstensi EsLint sudah berjalan.

<p align="center">
  <img alt="Crocodic" src="./misc/images/eslint.jpeg" width=250/>
</p>


## Build


#### Build Android APK

Buka **terminal / cmd** arahkan posisi folder ke folder project React Native Starter, jalankan ```npm run build-android```

#### Build iOS

Buka **terminal / cmd** arahkan posisi folder ke folder project React Native Starter, jalankan ```npm run bundle-ios```, kemudian build / archive lewat XCode