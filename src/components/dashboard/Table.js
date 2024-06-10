"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import firebase from "firebase/app";
import "firebase/database";
import { set } from "firebase/database";

export default function Table() {
  const [data, setData] = useState(null);
  // const [rawData, setRawData] = useState(null);

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://healthychild-19b7f-default-rtdb.asia-southeast1.firebasedatabase.app/data-anak/${id}.json`
        );
        fetchData();
        console.log("Data deleted: ", id);
      } catch (error) {
        console.error("Error deleting data: ", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://healthychild-19b7f-default-rtdb.asia-southeast1.firebasedatabase.app/data-anak.json"
      );
      const dataArray = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      setData(dataArray);
      console.log("Data fetched: ", dataArray);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatNumber = (number) => {
    const parsedNumber = parseFloat(number);
    return isNaN(parsedNumber) ? number : parsedNumber.toFixed(2);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-16 items-center">
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <span className="text-blue-500">Healthy</span>
            <span className="text-green-500">Child</span>
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Dashboard
            </p>
            <div className="flex w-full justify-end items-end">
              <Link
                href={"/input-data"}
                className="mt-1 px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Tambah Data
              </Link>
            </div>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3">
                No Rekam Medis
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Bayi
              </th>
              <th scope="col" className="px-6 py-3">
                Umur
              </th>
              <th scope="col" className="px-6 py-3">
                BB
              </th>
              <th scope="col" className="px-6 py-3">
                PB
              </th>
              <th scope="col" className="px-6 py-3">
                imt
              </th>
              <th scope="col" className="px-6 py-3">
                keterangan
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{item.tgl}</td>
                  <td className="px-6 py-4">{item.no_rekmed}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.umur} Bulan</td>
                  <td className="px-6 py-4">{formatNumber(item.bb)} kg</td>
                  <td className="px-6 py-4">{formatNumber(item.pb)} cm</td>
                  <td className="px-6 py-4">{formatNumber(item.imt)} kg/m²</td>
                  <td className="px-6 py-4">{item.ket}</td>
                  <td className="px-6 py-4 flex flex-col justify-center items-center">
                    <a
                      href={`/edit-data/${item.id}`}
                      className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => deleteData(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
