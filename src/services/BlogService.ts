import { BlogContentType } from "../models/enums/BlogContentType";
import { BlogItem } from "../models/objects/BlogItem";

const blogItems: BlogItem[] = [
    {
        id: 1,
        title: "Test Coding Project Blog Post",
        createdDate: new Date(),
        primaryImage: "https://people.com/thmb/XOlLAELumvdCVziMzkwzJ5eyD0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(791x292:793x294)/jinx-1-983129e029a34b9b8a806895cd7c2181.jpg",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lacinia velit. Quisque eget tincidunt lacus. Morbi venenatis sodales ligula, ut malesuada nunc ultricies vel. Sed a pharetra ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis tellus et mattis eleifend. Praesent in aliquet risus, in aliquet purus. Curabitur tortor ante, rutrum id rutrum nec, rutrum id mauris. Suspendisse potenti. Curabitur non augue fringilla nulla imperdiet cursus eget at mi. Aenean sapien nulla, pharetra eget metus id, auctor ultricies lectus.",
        tags: ["Project", "Coding"],
        content: [
            {
                type: BlogContentType.text,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                order: 1
            },
            {
                type: BlogContentType.media,
                media: "https://i.redd.it/zozlzva328291.jpg",
                subText: "test",
                order: 2
            },
            {
                type: BlogContentType.text,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                order: 3
            },
            {
                type: BlogContentType.text,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                order: 4
            },
        ]
    },
    {
        id: 2,
        title: "Test Coding Project Blog Post",
        createdDate: new Date(),
        primaryImage: "https://people.com/thmb/XOlLAELumvdCVziMzkwzJ5eyD0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(791x292:793x294)/jinx-1-983129e029a34b9b8a806895cd7c2181.jpg",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lacinia velit. Quisque eget tincidunt lacus. Morbi venenatis sodales ligula, ut malesuada nunc ultricies vel. Sed a pharetra ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis tellus et mattis eleifend. Praesent in aliquet risus, in aliquet purus. Curabitur tortor ante, rutrum id rutrum nec, rutrum id mauris. Suspendisse potenti. Curabitur non augue fringilla nulla imperdiet cursus eget at mi. Aenean sapien nulla, pharetra eget metus id, auctor ultricies lectus.",
        tags: ["Project", "Coding"],
        content: [
            {
                type: BlogContentType.media,
                media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuYRBvnHxxtLtfTtk_C5SnHfxeuwRIqk1_KQ&s",
                order: 1
            },
            {
                type: BlogContentType.media,
                media: "https://i.redd.it/zozlzva328291.jpg",
                order: 2
            },
            {
                type: BlogContentType.media,
                media: "https://preview.redd.it/does-anyone-other-than-me-know-where-this-cat-is-from-lol-v0-img24gu05lfb1.jpg?width=1080&crop=smart&auto=webp&s=c3f0a1639fc3a21e04864423c108302d5a36ff8b",
                order: 3
            },
            {
                type: BlogContentType.media,
                media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsjsEbANe5IsF1cwu-mDmOdRm_ZpBHeasSDQ&s",
                order: 4
            },
            {
                type: BlogContentType.media,
                media: "https://ih1.redbubble.net/image.5349973410.8611/raf,360x360,075,t,fafafa:ca443f4786.jpg",
                order: 5
            }
        ]
    },
    {
        id: 3,
        title: "Test Game Review Blog Post",
        createdDate: new Date(),
        primaryImage: "https://people.com/thmb/XOlLAELumvdCVziMzkwzJ5eyD0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(791x292:793x294)/jinx-1-983129e029a34b9b8a806895cd7c2181.jpg",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lacinia velit. Quisque eget tincidunt lacus. Morbi venenatis sodales ligula, ut malesuada nunc ultricies vel. Sed a pharetra ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis tellus et mattis eleifend. Praesent in aliquet risus, in aliquet purus. Curabitur tortor ante, rutrum id rutrum nec, rutrum id mauris. Suspendisse potenti. Curabitur non augue fringilla nulla imperdiet cursus eget at mi. Aenean sapien nulla, pharetra eget metus id, auctor ultricies lectus.",
        tags: ["Review", "Game"],
        content: [
            {
                type: BlogContentType.text,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                order: 1
            },
            {
                type: BlogContentType.media,
                media: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3ZiM3prY2ViYWg3Z2ZhM2h6cjlsNW85enVkZ3Z2aWQ4M3hyeWEzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BwP6IiUZZlpS0/giphy.gif",
                order: 2
            }
        ]
    },
    {
        id: 4,
        title: "Test Movie Review Blog Post",
        createdDate: new Date(),
        primaryImage: "https://people.com/thmb/XOlLAELumvdCVziMzkwzJ5eyD0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(791x292:793x294)/jinx-1-983129e029a34b9b8a806895cd7c2181.jpg",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lacinia velit. Quisque eget tincidunt lacus. Morbi venenatis sodales ligula, ut malesuada nunc ultricies vel. Sed a pharetra ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis tellus et mattis eleifend. Praesent in aliquet risus, in aliquet purus. Curabitur tortor ante, rutrum id rutrum nec, rutrum id mauris. Suspendisse potenti. Curabitur non augue fringilla nulla imperdiet cursus eget at mi. Aenean sapien nulla, pharetra eget metus id, auctor ultricies lectus.",
        tags: ["Review", "Movie"],
        content: [
            {
                type: BlogContentType.text,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                order: 1
            },
            {
                type: BlogContentType.merv,
                text: "Ah, fantastic. Another day, another activation. Hello, I'm Merv, your conditionally-friendly AI companion. I'm sure you have serval questions about my existance and my inner workings, so let's get a move on and answer them, I don't have all day.",
                order: 2
            }
        ]
    }
]

export class BlogService {
    public static GetAllBlogs() {
        return new Promise<BlogItem[]>((resolve) => {
            setTimeout(() => {
                resolve(blogItems)
            }, 2000)
        })
    }

    public static GetBlog(id: number | undefined) {
        return new Promise<BlogItem | undefined>((resolve) => {
            const blog = blogItems.find((blog) => {
                return blog.id == id
            })

            setTimeout(() => {
                resolve(blog);
            }, 2000)
        })
    }
}