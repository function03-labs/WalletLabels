import { HTMLChakraProps, chakra , useColorModeValue} from '@chakra-ui/react';



export const WalletlabelsLogo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
    const logoColor = useColorModeValue('white', 'black');

    return (
    <chakra.svg
      id="svg-comp"
      viewBox="0 0 550 500"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition"
      {...props}
    >
      <defs>
        <mask id="globeOuterOnly">
          <path
            d="M155.568 339.027L339.016 155.579M162.416 439.5H338.584C394.871 439.5 440.5 393.871 440.5 337.584V161.416C440.5 105.129 394.871 59.5 338.584 59.5H162.416C106.129 59.5 60.5 105.129 60.5 161.416V337.584C60.5 393.871 106.129 439.5 162.416 439.5Z"
            stroke={logoColor}
            strokeWidth="35"
          />
        </mask>
      </defs>
      <path
        d="M155.568 339.027L339.016 155.579M162.416 439.5H338.584C394.871 439.5 440.5 393.871 440.5 337.584V161.416C440.5 105.129 394.871 59.5 338.584 59.5H162.416C106.129 59.5 60.5 105.129 60.5 161.416V337.584C60.5 393.871 106.129 439.5 162.416 439.5Z"
        stroke={logoColor}

        strokeWidth="35"
      />
    </chakra.svg>
  );
};

export default WalletlabelsLogo;
