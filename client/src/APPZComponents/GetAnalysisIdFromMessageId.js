import axios from "axios";

export async function getAnalysisIdByMessageId(id) {
    let result = await axios.get('https://localhost:7130/api/Annotations/getAnalysisId', {
      params: {
        "messageId": id
      }
    });

    return result.data
}