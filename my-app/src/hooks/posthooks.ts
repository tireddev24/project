// import {AuthContext} from "@/context/AuthContext";
import {createPost as newPost} from "@/api/auth";
import {useState} from "react";

export const usePostHandler = () => {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	const createPost = async (formData: {formData: any}) => {
		const res = await newPost({formData});

		setPosts(res.data);
	};

	// const {setAccessToken, setUser} = useAuth();

	return {loading, posts, createPost};
};
