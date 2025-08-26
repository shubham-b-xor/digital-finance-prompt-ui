import { Box, IconButton, Slider, Typography } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const SliderWithValue: React.FC<{
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    resetValue?: number;
    disabled?: boolean;
}> = ({ value, min, max, step, onChange, resetValue = 0, disabled }) => (
    <Box display="flex" alignItems="center" gap={1}>
        <Box flex={1}>
            <Slider
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(_, v) => onChange(v as number)}
                valueLabelDisplay="auto"
                disabled={disabled}
            />
        </Box>
        <Typography width={48} textAlign="right">{value}</Typography>
        <IconButton
            size="small"
            aria-label="reset"
            onClick={() => onChange(resetValue)}
            disabled={disabled || value === resetValue}
        >
            <RestartAltIcon fontSize="small" />
        </IconButton>
    </Box>
);

export default SliderWithValue;
