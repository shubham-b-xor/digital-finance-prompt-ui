
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Typography } from '@mui/material';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import mockHistory from '../mocks/history.json';

const History: React.FC = () => {

    return (
        <>
            <Box
                sx={{
                    display: 'block',
                    maxWidth: 1000,
                    width: '100%',
                    p: 0
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography color="textSecondary" variant="h5" gutterBottom>
                       <ScheduleRoundedIcon
                        fontSize="small"
                        color="info"
                    /> Recent Queries
                    </Typography>
                </Box>
            </Box>

            {mockHistory.map((item, index) => (
                <Card sx={{ maxWidth: 1000, width: '100%', p: 2, mb: 2 }}>
                    <CardActionArea>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom variant="h6" component="div">
                                {item.title}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                <Chip sx={{ marginRight: 1 }} label={`${item.messageCount} Messages`} />
                                <Chip label={`${item.accuracyPercentage}%`} />
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {item.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.timestamp}
                        </Typography>
                        <Button size="small" color="primary">
                            View Conversation
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

export default History;
