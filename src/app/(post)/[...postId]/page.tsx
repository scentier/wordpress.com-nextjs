type Props = {
  params: { postId: string };
};

export default function post({ params }: Props) {
  const postId = params.postId;
  console.log(postId[1]);
  return <div>{postId}</div>;
}
