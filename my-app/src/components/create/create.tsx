import {
	Button,
	Heading,
	HStack,
	Input,
	Span,
	TagsInput,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";

import CustomSelect from "@/reusable/customselect";
import {Moods} from "@/store/data";
import {usePostStore} from "@/store/store";
import {type CreatePost} from "@/types/types";
import {Field, Textarea} from "@chakra-ui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Toaster, toaster} from "../ui/toaster";

const Create = () => {
	const {createPost: newPost} = usePostStore();

	const navigate = useNavigate();

	const [formData, setFormData] = useState<CreatePost>({
		quote: "",
		caption: "",
		moodCategory: "",
		imageUrl: "",
		tags: [],
	});

	const [tagInput, setTagInput] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const {name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddTag = () => {
		if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
			setFormData((prev) => ({
				...prev,
				tags: [...prev.tags, tagInput.trim()],
			}));
			setTagInput("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await newPost(formData);

		toaster.create({
			type: res.success ? "success" : "error",
			title: res.success ? "Success" : "Error",
			description: res.message,
		});

		res.success && navigate("/feed");

		console.log("Creating post:", formData);

		setFormData({
			quote: "",
			caption: "",
			moodCategory: "",
			imageUrl: "",
			tags: [],
		});
	};

	return (
		<VStack h={"full"} alignItems={"center"} justifyContent={"center"}>
			<Toaster />
			<Heading>Create New Post</Heading>
			<form>
				<VStack spaceY={6}>
					{/* Caption */}
					<Field.Root required>
						<Field.Label fontWeight="bold">Caption</Field.Label>
						<Textarea
							name="caption"
							placeholder="What's on your mind?"
							value={formData.caption}
							onChange={handleChange}
							minH="100px"
							resize="vertical"
						/>
					</Field.Root>

					{/* Quote */}
					<Field.Root>
						<Field.Label fontWeight="bold">Quote</Field.Label>
						<Textarea
							name="quote"
							placeholder="Add an inspiring quote..."
							value={formData.quote}
							onChange={handleChange}
							minH="80px"
							resize="vertical"
						/>
					</Field.Root>

					{/* Mood Category */}
					<Field.Root required>
						<Field.Label fontWeight="bold">
							Mood Category
						</Field.Label>
						<CustomSelect
							defaultValue="--MOOD--"
							value={formData.moodCategory || "--MOOD--"}
							onChange={(value) =>
								setFormData({
									...formData,
									moodCategory: value,
								})
							}
							options={Moods}
						/>
					</Field.Root>

					{/* Image URL */}
					<Field.Root>
						<Field.Label fontWeight="bold">Image URL</Field.Label>
						<Input
							name="imageUrl"
							type="url"
							placeholder="https://example.com/image.jpg"
							value={formData.imageUrl}
							onChange={handleChange}
						/>
					</Field.Root>

					{/* Tags */}
					<Field.Root>
						<Field.Label fontWeight="bold">Tags</Field.Label>
						<HStack spaceX={2} mb={4}>
							<Input
								placeholder="Add a tag and press Enter"
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
							<Button onClick={handleAddTag} colorScheme="blue">
								Add
							</Button>
						</HStack>
						{formData.tags.length > 0 && (
							<Wrap>
								{/* {formData.tags.map((tag) => ( */}
								<WrapItem>
									<TagsInput.Root
										value={formData.tags}
										defaultValue={[tagInput]}
										onValueChange={(details) =>
											setFormData((prev) => ({
												...prev,
												tags: details.value,
											}))
										}>
										<TagsInput.Label>Tags</TagsInput.Label>
										<TagsInput.Control>
											<TagsInput.Items />
											<TagsInput.Input placeholder="Add tag..." />
										</TagsInput.Control>
										<Span
											textStyle="xs"
											color="fg.muted"
											ms="auto">
											Press Enter or Return to add tag
										</Span>
									</TagsInput.Root>
								</WrapItem>
								{/* ))} */}
							</Wrap>
						)}
					</Field.Root>

					{/* Submit Button */}
					<Button
						type="submit"
						colorScheme="green"
						width="full"
						size="lg"
						fontWeight="bold"
						onClick={handleSubmit}>
						Create Post
					</Button>
				</VStack>
			</form>
		</VStack>
	);
};

export default Create;
