export interface HomeProps {
	id?: string;
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	createdAt?: string;
	updatedAt?: string;
	password?: string;
	avatarUrl?: null;
	bio?: null;
}

export interface CreatePost {
	quote: string;
	caption: string;
	moodCategory: string;
	tags: string[];
	imageUrl: string;
}
