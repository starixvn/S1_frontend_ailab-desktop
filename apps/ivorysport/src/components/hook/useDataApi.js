import { useState, useContext } from "react";
import { loadingContext } from "../common/context";

const useDataApi = (initialData, fetch) => {
	const [data, setData] = useState(initialData);
	const [message, setMessage] = useState("");
	const [errorCode, setErrorCode] = useState("");
	const { loading, setLoading } = useContext(loadingContext);

	const fetchData = async parameter => {
		setLoading(true);
		setMessage("");
		setErrorCode("");

		try {
			const res = await fetch(parameter);

			setErrorCode(res.data.errorCode);
			setMessage(res.data.message);
			setData(res.data.data);
		} catch (error) {
			setMessage(error);
		}

		setLoading(false);
	};

	return [{ data, message, errorCode, loading }, fetchData];
};

export { useDataApi };
