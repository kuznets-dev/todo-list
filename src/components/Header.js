import { Button, Grid, Typography } from "@material-ui/core";

export const Header = () => {
    return(
            <Grid
                style={{ background: "#3f51b5" }}
                container
                direction="row"
                justify="space-between"
                alignItems="center">
            <Typography
                style={{ padding: 20, color:"white" }}
                variant="h3"
                align="left">
                Todo App
            </Typography>
            <Button
                style={{ marginRight: 30, textTransform: "none", fontSize: 18, color: "white" }}>
                Войти
            </Button>
        </Grid>
    )
}