import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useRouter } from "next/router";
import MarkdownViewer from "../markdownView.js/markdownViewer";
import { useSelector } from "react-redux";
import { api } from "../../utils/backendUrl";
import { generateUniqueCode } from "../../utils/generateUniqueCode";
import data from "../../utils/tags.json";
import { BsTags } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Button from "../buttons/button";
import useUpload from "../../hooks/uploadHooks/useUpload";
import Title from "../layout/title";
import Image from "next/image";

function RichEditor() {
  const { fileUpload } = useUpload();

  const router = useRouter();

  const { id } = router.query;

  const userVar = useSelector((state) => state.user.userVar);

  const [value, setValue] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [addTag, setAddTag] = useState("");
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (userVar?.userId) {
      setUserName(userVar?.userName);
      setUserId(userVar?.userId);
    }
  }, [userVar]);

  useEffect(() => {
    async function getPostById() {
      try {
        const response = await axios.get(api + "/postById/" + id);
        setTitle(response.data[0]?.title);
        setPosterImage(response.data[0]?.posterImage);
        setTags(response.data[0]?.tag);
        setValue(response.data[0]?.body);
      } catch (error) {
        console.log("Get PostById API Error", error);
      }
    }
    getPostById();
  }, [id]);

  const checkPostUrl = async (title) => {
    var newTitle = title;
    var slug = newTitle
      .replace(/\s(?=\S)/g, "-")
      .replace(/\?/g, "")
      .replace(/-$/, "");

    slug = slug.trimEnd();
    try {
      const response = await axios.get(`${api}/checkuniqueUrl/${slug}`);
      if (response.status === 200) {
        const number = generateUniqueCode();
        slug = slug + "-" + number;
        return slug;
      }
    } catch (error) {
      if (error.response.status === 404) {
        slug = slug;
        return slug;
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  const updatePostById = async () => {
    setIsLoading(true);
    var newTitle = title;
    const newPostUrl = checkPostUrl(title);
    newPostUrl.then((postUrl) => {
      axios
        .put(api + "/updatePost/" + id, {
          body: value,
          title: title,
          posterImage: posterImage,
          postUrl: postUrl,
          tag: tags,
          status: "published",
        })
        .then((response) => {
          //console.log(response);
          if (response.status == 200) {
            setIsLoading(false);
            alert("Post updated successfully");
            router.push("/");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Update PostById API Error", error);
        });
    });
  };

  const handleSaveForLater = () => {
    setIsLoading(true);
    const newPostUrl = checkPostUrl(title);
    newPostUrl.then((postUrl) => {
      axios
        .post(api + "/post", {
          userId,
          body: value,
          title,
          posterImage: posterImage,
          postUrl: postUrl,
          userName: userName,
          tag: tags,
          status: "draft",
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setIsLoading(false);
            alert("Post Draft successfully");
            router.push("/dashboard?tab=My Posts");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Something went wrong");
          console.log("Error inserting post: ", error);
        });
    });
  };

  const handlePost = () => {
    setIsLoading(true);
    const newPostUrl = checkPostUrl(title);
    newPostUrl.then((postUrl) => {
      axios
        .post(api + "/post", {
          userId,
          body: value,
          title,
          posterImage: posterImage,
          postUrl: postUrl,
          userName: userName,
          tag: tags,
          status: "published",
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setIsLoading(false);
            alert("Post created successfully");
            router.push("/");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Something went wrong");
          console.log("Error inserting post: ", error);
        });
    });
  };

  const handleAddTag = (tag) => {
    const findTag = tags?.includes(tag);
    console.log(findTag);
    if (findTag) {
      setAddTag("");
    } else {
      setTags([...tags, tag]);
      setAddTag("");
    }
  };

  const removeTag = (tagName) => {
    const updatedTags = tags.filter((tag) => tag !== tagName);
    console.log(updatedTags);
    setTags(updatedTags);
  };

  async function onImageUpload(file) {
    const url = await fileUpload(file, `${userVar.userName}/blogs/images`);
    return url;
  }

  async function uploadPosterImage(file) {
    const url = await fileUpload(file, `${userVar.userName}/blogs/images`);
    setPosterImage(url);
  }

  return (
    <div
      className="container space-y-4 w-[100%] lg:w-[70%]"
      data-color-mode="light"
    >
      <Title title="newPost" />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-700">
          {id ? "Edit Your Blog" : "Write New Blog"}
        </h1>
        <button
          onClick={() => setPreview(!preview)}
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {preview ? "Editor" : "Preview"}
        </button>
      </div>
      {preview ? (
        posterImage ? (
          <Image
            src={posterImage}
            alt="Poster Image"
            width="400"
            height="300"
            layout="responsive"
            className="w-auto max-h-48"
          />
        ) : null
      ) : (
        <div className="relative flex items-center">
          <div className="border-y border-l border-gray-300 bg-gray-50 rounded-l-lg p-3">
            <AiOutlineCloudUpload />
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col justify-center w-full bg-gray-50 border border-gray-300 rounded-r-lg cursor-pointer hover:bg-gray-100 p-2.5"
            >
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Upload Cover Image</p>
                {posterImage ? (
                  <p className="text-sm text-green-500 max-w-1/2">
                    {posterImage
                      ?.split("/")
                      ?.pop()
                      ?.split("?")[0]
                      ?.split("%2F")
                      ?.pop()
                      .split("%20")
                      ?.join(" ")}
                  </p>
                ) : null}
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={(e) => uploadPosterImage(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
      {preview ? (
        <p className="font-bold text-2xl">{title}</p>
      ) : (
        <div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Blog Title"
            required
          />
        </div>
      )}
      {preview ? null : (
        <div className="relative">
          <div className="relative flex items-center">
            <div className="border-y border-l border-gray-300 bg-gray-50 rounded-l-lg p-3">
              <BsTags />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg block w-full p-2.5"
              placeholder="add tag"
              onChange={(e) => {
                setAddTag(e.target.value);
              }}
              value={addTag}
            />
          </div>
          {addTag ? (
            <div className="absolute z-50 bg-white border border-gray-400 rounded px-4 pb-2 w-full">
              {data.map((tag, index) => {
                if (
                  tag.name.toUpperCase().search(addTag.toUpperCase()) !== -1
                ) {
                  return (
                    <>
                      <div className="py-2 border-b" key={index}>
                        <p
                          className="cursor-pointer"
                          onClick={() => handleAddTag(tag.name)}
                        >
                          {tag.name}
                        </p>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          ) : null}
          {tags ? (
            <div className="flex space-x-3 mt-4">
              {tags.map((item) => {
                return (
                  <>
                    <div className="border border-orange-700 bg-orange-300 text-white font-bold mt-1 w-fit pl-2 p-1 rounded flex items-center space-x-2">
                      <p>{item}</p>
                      <RxCross2 onClick={() => removeTag(item)} />
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}
        </div>
      )}
      <div>
        {preview ? (
          <MarkdownViewer markdown={value} />
        ) : (
          <ReactMarkdownEditorLite
            shortcuts={true}
            placeholder="Write your blog content"
            value={value}
            onChange={(content) => {
              setValue(content.text);
            }}
            style={{ height: "100%" }}
            renderHTML={(text) => <MarkdownViewer markdown={text} />}
            table={{ maxRow: 20, maxCol: 10 }}
            view={{ menu: true, lg: true, html: false }}
            canView={{
              menu: true,
              lg: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
            }}
            onImageUpload={onImageUpload}
          />
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          onClick={() => handleSaveForLater()}
          className="w-[48%] text-blue-700 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Save for Later
        </button>
        <div className="w-[48%]">
          <Button
            onClick={id ? () => updatePostById() : () => handlePost()}
            isLoading={isLoading}
            text={"Publish"}
            isContained={true}
          />
        </div>
      </div>
    </div>
  );
}

export default RichEditor;
