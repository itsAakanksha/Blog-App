// import React, { useCallback, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, Select, RTE } from "../index";
// import services from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // This form is for posting new values or for editing the existing values

// export default function PostForm({ post }) {
//   const { register, handleSubmit, control, watch, setValue, getValues } =
//     useForm({
//       // if post already exists
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.slug || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);

//   const submit = async (data) => {
//     if (post) {
//       const file = data.image[0]
//         ? await services.uploadFile(data.image[0])
//         : null;
//       //   if image of form is updated then upload otherwise leave

//       if (file) {
//         services.deleteFile(post.featuredimage);
//       }

//       const dbPost = await services.updatePosts(post.$id, {
//         ...data,
//         featuredimage: file ? file.$id : undefined,
//         // if file is present in storage then add this file id in featuredimage
//       });
     

//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`)
//       }
//     } else {
//       const file = await services.uploadFile(data.image[0]);

//       // {console.log(userData.$id)}
//       if (file) {
//         const fileId = file.$id;
//         // console.log("fileid :",fileId)
//         data.featuredimage = fileId;
//         const dbPost = await services.createPosts({
//           ...data,
//           userid: userData.$id
//         });

//         if (dbPost) {
//           navigate(`/post/${dbPost.$id}`);
//         } else {
//           console.log("hii");
//         }
//       }
//     }
//   };

//     // const slugTransform = useCallback((value) => {
//     //   if (value && typeof value === "string") {
//     //     //   const slug = value.toLowerCase().replace(/./g,'-')
//     //     //   setValue('slug',slug)
//     //     //   return slug

//     //     // another method :
//     //     return value
//     //       .trim()
//     //       .toLowerCase()
//     //       .replace(/^[a-zA-Z\d\s]+/g, "-")
//     //       .replace(/\s/g, "-");
//     //   } else {
//     //     return "";
//     //   }
//     // }, []);

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string") {
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");
//     }
//     return "";
//   }, []);

//   useEffect(() => {
//     const subsription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });
//     // interview question : if you have taken a function in useEffect. how can you optimized this
//     // soln : store the function in a variable and do unsubsrcibe in return

//     return () => subsription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white p-6 shadow-md rounded-lg">
//       <div className="w-full md:w-2/3 md:pr-4">
//         <Input
//           label="Title:"
//           placeholder="Enter the title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug:"
//           placeholder="Enter the slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue(
//               "slug",
//               slugTransform(e.currentTarget.value),
//               { shouldValidate: true }
//             );
//           }}
//         />
//         <RTE
//           label="Content:"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>
//       <div className="w-full md:w-1/3 mt-4 md:mt-0">
//         <Input
//           label="Featured Image:"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={services.getFilePreview(post.featuredimage)}
//               alt={post.title}
//               className="rounded-lg w-full"
//             />
//           </div>
//         )}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: true })}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }









import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // console.log(userData)
    

    const submit = async (data) => {
       console.log(userData)

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredimage);
            }

            const dbPost = await appwriteService.updatePosts(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
             
            if (file) {
               
                data.featuredimage =file.$id;
                const dbPost = await appwriteService.createPosts({ ...data, userid: userData?.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  
    

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

