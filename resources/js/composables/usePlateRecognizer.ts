export interface PlateRecognizerResponse {
    box: object;
    plate: string;
}

export const usePlateRecognizer = () => {
  const appKey = import.meta.env.VITE_PLATE_RECOGNIZER_API_KEY

  const postSnapshot = async (data: Blob): Promise<PlateRecognizerResponse[]> => {
    let body = new FormData();
    body.append('upload', data);
    body.append("regions", "fr");
    const res = await fetch("https://api.platerecognizer.com/v1/plate-reader/", {
      method: "POST",
      headers: {
          Authorization: `Token ${appKey}`,
      },
      body: body,
    });
    return (await res.json()).results
  };

  return {
      postSnapshot,
  };
};
