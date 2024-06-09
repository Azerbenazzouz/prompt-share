import Link from "next/link";

const Form = ({
    type,
    onSubmit,
    setPost,
    Post,
    submitting,
    handleSubmit
}) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share prompts with the community, and let your creativity flow.
            </p>

            <form 
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Your Ai Prompt</span>
                    <textarea
                        value={Post.prompt}
                        onChange={(e)=>setPost({...Post, prompt: e.target.value})}
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag <span className="font-normal">(#product, #webdevelopment, #idea)</span>
                    </span>
                    <input
                        value={Post.tag}
                        onChange={(e)=>setPost({...Post, tag: e.target.value})}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form
