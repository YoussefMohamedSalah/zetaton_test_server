import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const shortenLink = async (url: string) => {
    let shortUrl: string;
    const shortener_url = process.env.SHORTENER_URL;
    const apiURL = `${shortener_url + url}`;
    try {
        const response = await axios.post(apiURL);
        const { data } = response.data;
        if (data.short_link) shortUrl = data.short_link

        else throw new Error('Unable to shorten link');
    } catch (error) {
        return new Error(error.message);
    }
    return shortUrl ? shortUrl : null;
};
