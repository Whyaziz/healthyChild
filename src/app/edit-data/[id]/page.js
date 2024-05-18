"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Edit({ params }) {
  const router = useRouter();
  const [data, setData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://healthychild-19b7f-default-rtdb.asia-southeast1.firebasedatabase.app/data-anak/${params.id}.json`
      );

      const [day, month, year] = response.data.tgl.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;

      document.getElementById("tanggal").value = formattedDate;
      document.getElementById("nama").value = response.data.nama;
      document.getElementById("umur").value = response.data.umur;
      document.getElementById("bb").value = response.data.bb;
      document.getElementById("pb").value = response.data.pb;
      document.getElementById("bbu").value = response.data.bbu;
      document.getElementById("pbu").value = response.data.pbu;
      document.getElementById("bbpb").value = response.data.bbpb;
      console.log("Data fetched: ", response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFetchDataSensor = async (event) => {
    try {
      const response = await axios.get(
        `https://healthychild-19b7f-default-rtdb.asia-southeast1.firebasedatabase.app/data-sensor.json?orderBy="$key"&limitToLast=1`
      );
      console.log("Data fetched: ", response.data);
      event.pb.value = Object.values(response.data)[0].pb;
      event.bb.value = Object.values(response.data)[0].bb;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();
    const tgl = formatDate(event.target.elements.tanggal.value);
    const nama = event.target.elements.nama.value;
    const umur = event.target.elements.umur.value;
    const no_rekmed = now.getTime();
    const bb = event.target.elements.bb.value;
    const pb = event.target.elements.pb.value;
    const bbu = event.target.elements.bbu.value;
    const pbu = event.target.elements.pbu.value;
    const bbpb = event.target.elements.bbpb.value;

    const data = {
      tgl,
      nama,
      no_rekmed,
      umur,
      bb,
      pb,
      bbu,
      pbu,
      bbpb,
    };

    try {
      await axios.put(
        `https://healthychild-19b7f-default-rtdb.asia-southeast1.firebasedatabase.app/data-anak/${params.id}.json`,
        data
      );
      alert("Data submitted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen p-16 items-center justify-center">
      <div className="w-full flex flex-col text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-lg p-8">
        <h1 className="text-2xl mb-5 font-semibold text-gray-900 dark:text-white">
          Input Data
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex justify-between w-full gap-8"
        >
          <div className="flex flex-col w-full">
            <div className="mb-3">
              <label
                htmlFor="tanggal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tanggal
              </label>
              <input
                type="date"
                id="tanggal"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="DD/MM/YYYY"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="nama"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Bayi
              </label>
              <input
                type="text"
                id="nama"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nama Bayi"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="umur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Umur Bayi
              </label>
              <input
                type="text"
                id="umur"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Umur"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="bb"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Berat Badan
              </label>
              <input
                type="text"
                id="bb"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="BB"
                required
              />
            </div>
            <div className="flex flex-row w-full gap-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={(e) => handleFetchDataSensor(e.target.form)}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-3"
              >
                Fetch Data
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="mb-3">
              <label
                htmlFor="pb"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Panjang Badan
              </label>
              <input
                type="text"
                id="pb"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="PB"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="bbu"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Berat Badan / Umur
              </label>
              <input
                type="text"
                id="bbu"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="BB/U"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="pbu"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Panjang Badan / Umur
              </label>
              <input
                type="text"
                id="pbu"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="PB/U"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="bbpb"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Berat Badan / Panjang Badan
              </label>
              <input
                type="text"
                id="bbpb"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="BB/PB"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
