<p align="center">
  <img alt="Crocodic" src="./support-files/images/crocodic.png" width=250/>
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

Buka terminal / cmd, masuk ke folder yang ingin Anda tuju, lalu jalan kan ```git clone <LINK_GIT>```.


## Running


#### First Time Running

Karena folder ```node_modules``` tidak ikut dalam repositori git, maka setelah clone berhasil perlu untuk melakukan install modul node.
Buka terminal / cmd arahkan posisi folder ke folder project (React Native Starter) lalu jalankan perintah ```npm install```.

#### Start React-Native Packager

Buka terminal / cmd arahkan posisi folder ke folder project lalu jalankan ```npm start```.

#### Run on Android

1. Hubungkan perangkat android dengan PC / laptop melalui USB.
2. Aktifkan **opsi pengembang** di pengaturan perangkat android.
3. Aktifkan opsi **USB Debugging** dalam list pengaturan **opsi pengembang**.
4. Buka terminal / cmd (jika React-Native Packager sedang berjalan maka gunakan jendela terminal / cmd baru), arahkan posisi folder ke folder project lalu jalankan ```npx react-native run-android```.

#### Run on iOS

Sebelum run project di perangkat iOS diperlukan untuk melakukan step tambahan berikut untuk menginstal dependency pod:
a. Masih di folder project jalankan perintah ```cd ios``` untuk berpindah ke folder ```ios```.
b. Install dependency pod dengan perintah ```pod install```, mungkin akan sedikit memakan waktu.
c. Setelah seluruh dependency pod terinstall maka jalankan ```cd ..``` untuk kembali ke folder project.

Jalankan langkah di bawah ini untuk run di perangkat iOS:
1. Hubungkan perangkat iOS dengan perangkat MacOS melalui USB Lightning.
2. Buka terminal / cmd (jika React-Native Packager sedang berjalan maka gunakan jendela terminal / cmd baru), arahkan posisi folder ke folder project lalu jalankan ```npx react-native run-ios```.

#### Note

Apabila dalam proses running Anda belum menjalankan React-Native Packager, maka sistem otomatis akan mendeteksi dan membuka satu jendela terminal / cmd dengan React-Native Packager yang telah running di dalamnya.


## Set-Up EsLint

EsLint membantu untuk menyatakan peraturan-peraturan penulisan kode, ini membuat penulisan kode menjadi lebih disiplin dan konsisten.

Anda dapat mengubah konfigurasi peraturannya di file ```.eslintrc.js```, dan agar peraturan EsLint dapat berjalan, anda terlebih dahulu harus menginstall ekstensi [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) di IDE Visual Studio Code anda.

Setelah terinstal, buka salah satu file javascript atau typescript, lihat di bagian bawah kanan visual studio code terdapat button bertuliskan EsLint, pastikan tercentang yang berarti menandakan bahwa ekstensi EsLint sudah berjalan.

<p align="center">
  <img alt="Crocodic" src="./support-files/images/eslint.jpeg" width=250/>
</p>


## Build


#### Build Android APK

Buka terminal / cmd arahkan posisi folder ke folder project lalu jalankan ```npm run build-android```.

#### Build iOS

Buka terminal / cmd arahkan posisi folder ke folder project lalu jalankan ```npm run bundle-ios```, kemudian build / archive melalui aplikasi XCode (XCode hanya tersedia bagi pengguna MacOS).