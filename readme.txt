MPC
Ganti taskbar jadi A jangan NuxtLink biar otomatis refresh, dan ketutup taskbarnya. (DONE)

NuxtLink Contact Us: (duluan ini aja dlu besok) (DONE)
grid 1x6 : naomi ray tristan fikri usman sam (SCRAPED)
if di hape
flex column:
flex row naomi
flex row ray and so on (SCRAPED)

NuxtLink index/home: 
grid 1x2 gap 30: (rounded md for every div inside)
kiri event(study) updated by committing, kanan GET task lalu <task v-for :title= :status=/>
lalu dibawah
flex row kalau di pc, flex column kalau di hp
event competition, and content

GET TASK: return table task, {title: , status:} (ON PROGRESS TGL 02/02)
Task component:
Props : title, status
v-if status 0, gray img (ambil dri figma)
v-if status 1, green img (figma)
v-if status 2, red img (figma)

Buat DB di MongoDB, username : mikroskilmpcclub (DONE)
password: mikroskilmpcclub 

Table kemungkinan: 
User (DONE)
News : title, content, creator
Materi video : title, link, creator
Materi coach : title, pdf
Materi diskusi : title, pdf, creator
Events : title, tanggal(datetime bisa jadi atau string aja), content, gambar
Task : task name, status ( done, ongoing, planned ) (DONE)

Login : NIM dan Password (DONE)
(if NIM ditemukan di user, tapi password kosong atau null atau false, router push “register”
dialog : “Halo (nama), silahkan registrasi dengan password untuk login ya”) (DONE)
(if berhasil login, set state, isLoggedIn : true, isAdmin: dependant, token: token)
backend juga harus jwt sign token isinya NIM, nama, role(kosong brti member), status(kosong brti unpaid)
(Kalau isLoggedIn true, v-if nuxtlink profile, v-if nuxtlink login dan register di tab, dan navbar jadi hilang)
(Setiap mencoba akses materi, cek token)
(Kalau isAdmin true, v-if nuxtlink Publish, dan Member disamping profile)

NuxtLink Publish (harus check validity to-from)
(5 pilihan, dalam bentuk grid 1x3 ditengah, kalau di hape 3x2 di tengah, pilihan : coach, dicussion, video, events, news) setelah pilih tinggal masukin title, pdf/video/content, dan creator kalau video, content, tanggal kalau events
Route : publish/coach, publish/discussion, and so on

NuxtLink Material (kalau isAdmin, v-if Edit align center diatas pdf, dan disamping konten (kiri))

NuxtLink Member (list semua member, harus check validity to-from) (DONE)
(Show dalam grid nx5) (CHANGE to nx3)
(Search member by name or NIM, otomatis)
(Tiap member bisa ditekan, keluar modal, isi informasi NIM, Nama, Role[member kalau role gk dideclare] dan Status[unpaid kalau gk dideclare])
(Didalam modal ada edit, bisa edit status paid jadi true/false (pilihan dalam bentuk select))
(Didalam modal bisa reset password member, utk bantu yang lupa pw) (DONE)

NuxtLink News: (CHANGED, TO BE DISCUSSED)
Show dalam bentuk flex column, kebawah, masing-masing news GET dari database News, kembalikan Title, Creator, Content (string panjang no gambar)

NuxtLink Events: (SCRAPED)
Show dalam bentuk flex column, kebawah, masing-masing events GET dari database Events, return Title, Image(Base64 atau Link to be revised), dan Description/Content, Date

Nuxt Link Register : NIM dan Password dan Confirm Password (DONE)
(if NIM tidak ditemukan, maka bukan member MPC, dialog : “NIM tidak ditemukan”
dialog 2 : “Jika kamu merasa ada kesalahan, harap menuju ke Contact Us”) (NOT YET, ON PROGRESS TGL 01/02)
(if NIM ditemukan, pw dan cpw benar, maka ke database, update kolom, tambahin pw yang di bcrypt pakai salt random) (DONE)

NuxtLink Profile: (DONE)
GET dari backend, kirim token yang di store, lalu backend decode, ambil NIM, check di database, kembalikan NIM, Nama, Role(Member kalau null), Status(Unpaid kalau null) (bisa untuk NuxtLink member juga), di profile tinggal styling, bisa ubah password dengan change password, popup modal currentpassword, newpassword, newconfirmpassword, post ke database, setelah ubah password, user di logout (resetToken)

diprofile button logout (DONE, BUT ON NAVBAR)
<a> ke home, tp store di resetToken


Materi Coach dan Diskusi
(GET dari database materi, return link pdf, sama judul materi, nanti embed pdf sebagai object kayak di TLX)

Materi video
(GET dari database materi video, return link video, judul video, creator video, lalu embed video, dengan judul bold, dan sub judul creator thin)