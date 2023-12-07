import imageCompression from "browser-image-compression"
import image64 from "./image64"
import { useState, useEffect, useCallback } from "react"
import axios from "axios"

const useCompress = (url) => {
    const [img, setImg] = useState()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(true)

    // const compressImg = useCallback(async (imageFile) => {
    //     try {
    //         const options = {
    //             maxSizeMB: 0.08,
    //             maxWidthOrHeight: 1000,
    //         }
    //         const compressedFile = await imageCompression(imageFile, options)
    //         return await image64(compressedFile)
    //     } catch (error) {
    //         console.error(error)
    //         return null
    //     }
    // }, [])

    useEffect(() => {
        if (url) {
            const fetchDataForUrl = async (urlItem) => {
                try {
                    const response = await fetch(urlItem.background_image, {
                        method: "GET",
                        headers: {
                            Origin: origin,
                            // header lain yang dibutuhkan
                        },
                    })
                   

                    // if (response.url.includes("data:image/webp;base64")) {
                    //     setImg(response.url)
                    //     setLoading(false)
                    //     return
                    // }

                    const blob = await response.blob()
                    console.log(blob)

                    const imageFile = new File([blob], `${urlItem._id}.jpg`, {
                        type: "image/jpeg",
                    })

                    console.log(imageFile)

                    const formData = new FormData()
                    formData.append("images", imageFile)

                    // Lakukan permintaan API dengan gambar yang terkumpul
                    const mangan = await axios.post("/api/upload", formData)
                    console.log("Hasil upload:", mangan)
                } catch (error) {
                    console.error("Gagal melakukan fetch dan upload:", error)
                } finally {
                    setLoading(false)
                }
            }

            // Fungsi untuk memulai fetch data untuk setiap URL secara berkala
            const startFetchingDataForUrls = () => {
                // Lakukan fetch data untuk setiap URL pertama kali
                url?.forEach((urlItem) => {
                    fetchDataForUrl(urlItem)
                })

                // Fetch data untuk setiap URL setiap 5 menit (sesuaikan interval sesuai kebutuhan)
                const fetchInterval = setInterval(
                    () => {
                        url?.forEach((urlItem) => {
                            fetchDataForUrl(urlItem)
                        })
                    },
                    10 * 60 * 1000,
                ) // 5 menit dalam milidetik

                // Opsional: Berhenti melakukan fetch setelah beberapa waktu tertentu
                const stopIntervalAfterDuration = 60 * 60 * 1000 // Berhenti setelah 1 jam (sesuaikan sesuai kebutuhan)
                setTimeout(() => {
                    clearInterval(fetchInterval)
                }, stopIntervalAfterDuration)
            }

            // Mulai melakukan fetch data untuk setiap URL
            startFetchingDataForUrls()
        }
    }, [url])

    return { img, loading }
}

export default useCompress
