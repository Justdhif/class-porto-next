"use client";

import { useState, useEffect } from "react";
import { Send, Instagram, Mail, Users } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const studentsAndTeachers = [
  "Guru: Bu Shova",
  "Adrian Fatih Nur Muhammad",
  "Ahmad Radhwa Supriyadi",
  "Ahza Rafif Kamal",
  "Ali Zavier Haikel Alkatiri",
  "Alisa Normalinda",
  "Andini Azzahra Puspita",
  "Andyto Murti Pangudi Hudianto",
  "Anugrah Luhur P",
  "Arief Dwi Wicaksono",
  "Damar Raditya",
  "Darrel Dzakwan",
  "Dhaniswara Fadhlurahman",
  "Dimas Dwi Ananda Putra",
  "Hanif M Yasfa",
  "Hendra",
  "Ibnu Tidar Pamungkas",
  "Kafka Sutikno",
  "Keisha Aurelia Rifai",
  "Keysha Al Hidayah",
  "M. Fathir Abdul Salam",
  "M. Vito Devara Ramadhan",
  "Maizza Raflee Arviansyah",
  "Muhammad Fahri Ramadhan",
  "Muhammad Farrell Raziq",
  "Muhammad Fattah Q.J",
  "Muhammad Gifari",
  "Muhammad Kemal Yahya",
  "Nadhif Ararya",
  "Nafisah Yulia Rahmah",
  "Nazzua Aqillah",
  "Pasha Maulana Akbar",
  "Rai Handitya Musopan",
  "Rajendra Mahadana W.D",
  "Refalina Cahaya Kamilah",
  "Ridwan Hamid Siregar",
  "Rifqi Agus Pratama",
  "Rizky Oryza Rahmanekha",
  "Tiara Azita Safitri",
  "Syadza",
  "Zahrah Nur Aini",
];

export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState(studentsAndTeachers[0]);
  const [message, setMessage] = useState("");

  // ✅ Animasi pertama kali masuk ke halaman
  const pageAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // ✅ Ambil pesan dari Firebase
  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, "secret_messages"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      setMessages(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || !sender.trim()) return;
    await addDoc(collection(db, "secret_messages"), {
      sender,
      recipient,
      message,
      timestamp: new Date(),
    });

    setMessage("");
    setSender("");

    // Refresh pesan setelah mengirim
    const q = query(
      collection(db, "secret_messages"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    setMessages(querySnapshot.docs.map((doc) => doc.data()));
  };

  return (
    <motion.div
      className="mx-auto pt-24 py-10 px-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg text-black dark:text-white"
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Hubungi Kami</h1>

      {/* Tombol Instagram & Email dengan animasi hover */}
      <div className="flex justify-center space-x-4 mb-6">
        <motion.a
          href=""
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Instagram size={20} /> Instagram
        </motion.a>
        <motion.a
          href=""
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mail size={20} /> Email
        </motion.a>
      </div>

      {/* Layout 2 Kolom */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulir Pesan */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users size={20} /> Kirim Pesan Rahasia
          </h2>
          <input
            type="text"
            placeholder="Nama Anda"
            className="w-full p-2 border rounded-md mb-3 bg-gray-200 dark:bg-gray-700"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded-md mb-3 bg-gray-200 dark:bg-gray-700"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            {studentsAndTeachers.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <textarea
            className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700"
            rows="4"
            placeholder="Tulis pesanmu di sini..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <motion.button
            onClick={sendMessage}
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={18} className="mr-2" /> Kirim Pesan
          </motion.button>
        </motion.div>

        {/* Daftar Pesan */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
        >
          <h3 className="text-xl font-semibold mb-4">Pesan Rahasia Terkirim</h3>
          <div className="max-h-60 overflow-y-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className="p-3 border-b border-gray-300 dark:border-gray-600 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 },
                  }}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      msg.sender
                    )}&background=random&color=fff&size=40`}
                    alt={msg.sender}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {msg.sender} → {msg.recipient}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {msg.message}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada pesan.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
