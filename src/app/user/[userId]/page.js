"use client";
import Header from "@/components/Header";
import { getDetailUser } from "@/redux/slice/userSlice";
import { Box, Button, CircularProgress, Container, Grid2 } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDetail from "./ItemDetail";

export default function UserDetail() {
  const dispatch = useDispatch();
  const { detailUser, isLoading } = useSelector((state) => state.user);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailUser(params.userId));
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth={"md"}>
        <Box
          marginTop={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid2 size={12}>
            <Card sx={{ border: "1px solid #d4d4d4", borderRadius: 4 }}>
              <CardContent>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Box
                    sx={{
                      display: { xs: "block", md: "flex" },
                    }}
                  >
                    <Image
                      width={300}
                      height={200}
                      style={{ borderRadius: 12, marginRight: 20 }}
                      src={
                        detailUser?.data?.avatar ||
                        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1733193477~exp=1733197077~hmac=164cf990982a371c74560000aeb04740a5056ab75677e35b3b117d851765f24f&w=740"
                      }
                      alt="image"
                    />
                    <Box>
                      <Typography gutterBottom variant="h4" component="div">
                        Detail User
                      </Typography>
                      <ItemDetail
                        label={"First Name"}
                        fill={`: ${detailUser?.data?.first_name || "-"}`}
                      />
                      <ItemDetail
                        label={"Last Name"}
                        fill={`: ${detailUser.data.last_name || "-"} `}
                      />
                      <ItemDetail
                        label={"Email"}
                        fill={`: ${detailUser.data.email || "-"}`}
                      />

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => router.back()}
                      >
                        Kembali
                      </Button>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid2>
        </Box>
      </Container>
    </>
  );
}
