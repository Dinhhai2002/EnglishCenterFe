import commentsApiService from "@/services/API/CommentsApiService";
import replyCommentsApiService from "@/services/API/ReplyCommentsApiService";
import utils from "@/utils/Utils";
import { useEffect, useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { toast } from "react-toastify";
import Empty from "../Empty/Empty";
import {
  EditSuccess,
  EditError,
  DeleteSuccess,
  DeleteError,
} from "@/utils/MessageToast";
import { Box, CircularProgress } from "@mui/material";
import authenticationApiService from "@/services/API/AuthenticationApiService";

const Comments = ({ examId, onAddComment }: any) => {
  const [comments, setComments] = useState<any>([]);
  const [isCommentModify, setIsCommentModify] = useState(false);
  const [loading, setLoading] = useState(true);

  const { currentUser, isCurrentUser } = utils.getCurrentUser();

  const fetchComments = (examId: number, isModify = false) => {
    authenticationApiService
      .getCommentsByExamId(examId)
      .then((data) => {
        setComments(data.data);
        isModify && setIsCommentModify(false);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments(Number(examId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchComments(Number(examId), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommentModify]);

  // map data hiển thị comments
  let data: any[] = [];
  comments.map((item: any) => {
    let replies: any[] = [];
    item.replies.map((item: any) => {
      return replies.push({
        userId: item.user.id,
        comId: item.id,
        fullName: item.user.user_name,
        userProfile: "#",
        text: item.content,
        avatarUrl: item.user.avatar_url,
      });
    });
    data.push({
      userId: item.user.id,
      comId: item.id,
      fullName: item.user.user_name,
      userProfile: "#",
      text: item.content,
      avatarUrl: item.user.avatar_url,
      replies: replies,
    });
  });

  const handleSubmitComments = (data: any) => {
    commentsApiService
      .create(data.text, Number(examId))
      .then((data: any) => {
        // truyền tín hiệu lên component cha để set lại countComment
        setIsCommentModify(true);
        onAddComment(data);
      })
      .catch((error: any) => {});
  };

  const fetchCreateReplyComment = (content: string, commentId: number) => {
    replyCommentsApiService
      .create(content, commentId)
      .then((data: any) => {
        // truyền tín hiệu lên component cha để set lại countComment
        setIsCommentModify(true);
        onAddComment(data);
      })
      .catch((error: any) => {});
  };

  const handleSubmitReply = (data: any) => {
    if (data.parentOfRepliedCommentId === undefined) {
      fetchCreateReplyComment(data.text, Number(data.repliedToCommentId));
    } else {
      fetchCreateReplyComment(data.text, Number(data.parentOfRepliedCommentId));
    }
  };

  const handleSubmitEdit = (data: any) => {
    if (data.parentOfEditedCommentId === undefined) {
      // update comments
      commentsApiService
        .update(Number(data.comId), data.text, Number(examId))
        .then((data: any) => {
          toast.success(EditSuccess);
        })
        .catch((error: any) => {
          toast.error(EditError);
        });
    } else {
      // update replycomments
      replyCommentsApiService
        .update(
          Number(data.comId),
          data.text,
          Number(data.parentOfEditedCommentId)
        )
        .then((data: any) => {
          toast.success(EditSuccess);
        })
        .catch((error: any) => {
          toast.error(EditError);
        });
    }
  };

  const handleSubmitDelete = (data: any) => {
    if (data.parentOfDeleteId === undefined) {
      //delete comments
      commentsApiService
        .delete(Number(data.comIdToDelete))
        .then((data: any) => {
          toast.success(DeleteSuccess);

          // truyền tín hiệu lên component cha để set lại countComment
          onAddComment(data);
          setIsCommentModify(true);
        })
        .catch((error: any) => {
          toast.error(DeleteError);
        });
    } else {
      // delete replyComments
      replyCommentsApiService
        .delete(Number(data.comIdToDelete))
        .then((data: any) => {
          toast.success(DeleteSuccess);
          // truyền tín hiệu lên component cha để set lại countComment
          onAddComment(data);
          setIsCommentModify(true);
        })
        .catch((error: any) => {
          toast.error(DeleteError);
        });
    }
  };

  const customNoComment = () => <Empty />;
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CommentSection
          currentUser={
            isCurrentUser
              ? {
                  currentUserId: `${currentUser.id}`,
                  currentUserImg: currentUser.avatar_url,
                  currentUserProfile: "#",
                  currentUserFullName: currentUser.user_name,
                }
              : null
          }
          logIn={{
            loginLink: `${process.env.REACT_APP_BASE_URL_FE}/authentication/login`,
            signupLink: `${process.env.REACT_APP_BASE_URL_FE}/authentication/register`,
          }}
          commentData={data}
          onSubmitAction={(data: {
            userId: string;
            comId: string;
            avatarUrl: string;
            userProfile?: string;
            fullName: string;
            text: string;
            replies: any;
            commentId: string;
          }) => handleSubmitComments(data)}
          currentData={(data: any) => {}}
          onDeleteAction={(data: any) => {
            handleSubmitDelete(data);
          }}
          onReplyAction={(data: any) => {
            handleSubmitReply(data);
          }}
          onEditAction={(data: any) => handleSubmitEdit(data)}
          customNoComment={() => customNoComment()}
          advancedInput={true}
          replyInputStyle={{ borderBottom: "1px solid black", color: "black" }}
          submitBtnStyle={{
            padding: "7px 15px",
          }}
          cancelBtnStyle={{
            border: "1px solid gray",
            backgroundColor: "gray",
            color: "white",
            padding: "7px 15px",
          }}
        />
      )}
    </>
  );
};

export default Comments;
