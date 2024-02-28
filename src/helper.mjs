import {
    useState,
    useLayoutEffect,
    useEffect,
    useCallback,
    useRef,
} from 'react';

// Hooks...
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

export function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export const useCarousel = () => {
    const containerRef = useRef(null);
    const scrollX = useCallback(
        (offset) => {
            if (!containerRef || !containerRef.current) return;
            containerRef.current.scroll({
                left: containerRef.current.scrollLeft + offset,
                behavior: 'smooth',
            });
        },
        [containerRef],
    );

    const scrollLeft = (value = 400) => scrollX(-value);

    const scrollRight = (value = 400) => scrollX(value);

    return { ref: containerRef, scrollLeft, scrollRight };
};

// Contants...
export const badgeDetails = [
    {
        "id": 3,
        "name": "Environment",
        "color": "#E5F8E8",
        "badges": [
            {
                "id": 4,
                "name": "Sustainable materials",
                "description": "The product packaging is made using environmentally conscious materials and in its design, production, and disposal, all aimed at minimizing its ecological impact.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/SUSTAINABLE-MATERIALS.svg",
                "bullet_points": "<ul><li>Certifications: Forest Stewardship Council (FSC); Program for Endorsement of Forest Certification Schemes (PEFC); Sustainable Forestry Initiative (SFI); OK Compost Home (TUV Austria).</li><li>The brand website publicly discloses that its product packaging is devoid of plastic or PLA and is instead crafted from 100% compostable paper and cardboard materials or is completely free of any packaging materials.</li></ul>",
                "goals": [
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    }
                ]
            },
            {
                "id": 8,
                "name": "Offsets Carbon",
                "description": "The brand is certified by a globally-recognized standard for carbon accountability/ offsetting, and the amount of greenhouse gas emissions (GHGe) it releases into the atmosphere from its activities are balanced by equivalent amount or more GHGe being removed from the atmosphere.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/Offsets-Carbon.svg",
                "bullet_points": "<ul><li>Certifications: Climate Neutral Certified; Carbon Trust's Carbon Neutral Certified; Carbon Fund's Carbon Free Certified; Climate Partner's Climate Neutral Certified; SCS Carbon Neutral Certified</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    },
                    {
                        "id": 4,
                        "name": "6 CLEAN WATER AND SANITATION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-6.png"
                    },
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    },
                    {
                        "id": 7,
                        "name": "14 LIFE BELOW WATER",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-14.png"
                    }
                ]
            },
            {
                "id": 7,
                "name": "Sustainable Packaging",
                "description": "A high proportion of product(s) are made using recycled or environmentally-friendly materials.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/SUSTAINABLE-PACKAGING.svg",
                "bullet_points": "<ul><li>Certifications: Global Recycled Standard (GRS); Recycled Claim Standard (RCS 100); Organic Content Standard (OCS); Global Organic Textile Standard (GOTS); Cradle to Cradle Certified (C2C); Forest Stewardship Council (FSC); Program for Endorsement of Forest Certification Schemes (PEFC); Sustainable Fibre Alliance (SFA); ZQ Merino; Responsible Wool Standard (RWS); Leather Working Group (LWG)</li><li>Product is made from using TENCEL™ fibers/technology, such as Lyocell/Modal/REFIBRA™</li><li>Product is made using LENZING™ fibers, such as ECOVERO™</li></ul>",
                "goals": [
                    {
                        "id": 4,
                        "name": "6 CLEAN WATER AND SANITATION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-6.png"
                    },
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    }
                ]
            },
            {
                "id": 3,
                "name": "Promotes circularity",
                "description": "The brand promotes circularity by creating products from recycled materials or via resale programs, offering repair services, or recycling items at end-of-life.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/PROMOTES-CIRCULARITY.svg",
                "bullet_points": "<ul><li>Certifications: Global Recycled Standard (GRS); Recycled Claim Standard (RCS 100)</li><li>Public disclosure on brand website of resale program, repair service offering, or recycling initiative, how they work, and details on contributions made by the brand.</li></ul>",
                "goals": [
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    }
                ]
            },
            {
                "id": 5,
                "name": "Low Waste",
                "description": "The brand minimizes the generation of waste and aims to reduce environmental impact.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/low-waste.svg",
                "bullet_points": "<ul><li>Material Processing/Chemical Control Certifications: Global Organic Textile Standard (GOTS), Bluesign, OEKO-TEX® Standard 100, OEKO-TEX® DETOX TO ZERO, Zero Discharge of Hazardous Chemicals (ZDHC), Registration, Evaluation, Authorisation and Restriction of Chemicals (REACH), Responsible Care.</li><li>Low Waste Packaging Certifications: ASTM D6400, Biodegradable Products Institute (BPI); OK Compost Industrial (TUV Austria); European Standard EN 13432/ Seedling.</li><li>To recycle plastic packaging/ (other items), the brand has an inhouse take back/recycling program or partners with waste recycling companies, such as TerraCycle, Pact Collective Recycling, etc.</li></ul>",
                "goals": [
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "name": "Worker wellbeing",
        "color": "#F8E8E5",
        "badges": [
            {
                "id": 20,
                "name": "Fair Trade",
                "description": "The product is certified fair trade and has been verified by a certification body to meet standards.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/fair-trade.svg",
                "bullet_points": "<ul><li>Certifications: Fair Trade International (FLO); Fair Trade USA; Fair for Life; Naturland Fair; Fair Trade Proof; FLOCERT</li></ul>",
                "goals": [
                    {
                        "id": 9,
                        "name": "1 NO POVERTY",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-1.png"
                    },
                    {
                        "id": 10,
                        "name": "8 DECENT WORK AND ECONOMIC GROWTH",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-8.png"
                    },
                    {
                        "id": 11,
                        "name": "10 REDUCED INEQUALITIES",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-10.png"
                    }
                ]
            },
            {
                "id": 6,
                "name": "Ethical Labour",
                "description": "The brand practices fair, humane, and socially responsible employment practices that prioritize workers' rights, well-being, and dignity.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/ETHICAL-LABOUR.svg",
                "bullet_points": "<ul><li>Certifications: Social Accountability International (SA8000); Fair Trade/FLOCERT; Global Organic Textile Standard (GOTS); SMETA/SEDEX (Sedex Members Ethical Trade Audit); Fair Wear Foundation (FWF); Worldwide Responsible Apparel Production (WRAP); Business Social Compliance Initiative (BSCI)</li></ul>",
                "goals": [
                    {
                        "id": 10,
                        "name": "8 DECENT WORK AND ECONOMIC GROWTH",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-8.png"
                    },
                    {
                        "id": 11,
                        "name": "10 REDUCED INEQUALITIES",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-10.png"
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "Animal Welfare",
        "color": "#F9E7F9",
        "badges": [
            {
                "id": 10,
                "name": "Responsibly Sourced",
                "description": "The brand’s animal-derived ingredients are certified responsibly sourced ensuring humane treatment and responsible management of animals.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/RESPONSIBLY-SOURCED.svg",
                "bullet_points": "<ul><li>Certifications: Responsible Alpaca Standard (RAS); Responsible Wool Standard (RWS); Sustainable Fibre Alliance (SFA); ZQ-Certified Wool.</li></ul>",
                "goals": [
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    }
                ]
            },
            {
                "id": 9,
                "name": "Vegan",
                "description": "Product has no animal-derived ingredients.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/vegan.svg",
                "bullet_points": "<ul><li>Public disclosure on brand website/product packaging communicating that the product or range is 100% vegan.</li><li>Certifications: PETA-Approved Vegan; Vegan Action; Vegan Society.</li><li>Ingredient checks for animal-derived ingredients, if not certified.</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    },
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    },
                    {
                        "id": 7,
                        "name": "14 LIFE BELOW WATER",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-14.png"
                    },
                    {
                        "id": 8,
                        "name": "15 LIFE ON LAND",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-15.png"
                    }
                ]
            },
            {
                "id": 19,
                "name": "Cruelty Free",
                "description": "The brand and its suppliers adhere to cruelty-free principles, ensuring that no testing on animals is conducted for any of their products, ingredients, or components.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/cruelty-free.svg",
                "bullet_points": "<ul><li>Public disclosure on brand website/product packaging communicating that the brand is cruelty-free.</li><li>Certifications: Leaping Bunny; PETA Beauty Without Bunnies.</li></ul>",
                "goals": [
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Fair Trade",
                "description": "The product packaging is made using environmentally conscious materials and in its design,\r\nproduction, and disposal, all aimed at minimizing its ecological impact.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/fair-trade.svg",
                "bullet_points": null,
                "goals": []
            }
        ]
    },
    {
        "id": 1,
        "name": "Philanthropy",
        "color": "#E5EFF8",
        "badges": [
            {
                "id": 12,
                "name": "Homegrown",
                "description": "Product is manufactured locally or domestically, in the United States of America (USA).",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/home-grown.svg",
                "bullet_points": "",
                "goals": []
            },
            {
                "id": 11,
                "name": "Gives Back",
                "description": "Brand gives back to people or the planet.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/gives-back.svg",
                "bullet_points": "<ul><li>Certifications: 1% for the Planet; Climate Neutral Certified; Carbon Trust's Carbon Neutral Certified; Carbon Fund's Carbon Free Certified; Climate Partner's Climate Neutral Certified; SCS Carbon Neutral Certified;</li><li>If not certified, the brand publicly discloses on its website that it has initiatives that support:<ul><li>Educational programs committed to the wellbeing of people/planet</li><li>Traditional artisan skills/knowledge</li><li>Underprivileged communities</li><li>Environmental/ecological restoration projects</li><li>Climate Action</li></ul></li></ul>",
                "goals": []
            },
            {
                "id": 1,
                "name": "Fair Trade",
                "description": "The product packaging is made using environmentally conscious materials and in its design,\r\nproduction, and disposal, all aimed at minimizing its ecological impact.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/fair-trade.svg",
                "bullet_points": null,
                "goals": []
            }
        ]
    },
    {
        "id": 5,
        "name": "Clean Ingredients",
        "color": "#E7F6F9",
        "badges": [
            {
                "id": 16,
                "name": "Transparent Ingredients",
                "description": "",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/Certified-Natural.svg",
                "bullet_points": null,
                "goals": []
            },
            {
                "id": 18,
                "name": "Non Toxic",
                "description": "Product is free from harmful and toxic substances that could pose risks to human health or the environment.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/Non-Toxic.svg",
                "bullet_points": "<ul><li>Certifications/Standards: Environmental Working Group (EWG) Verified; Made Safe Certified</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    },
                    {
                        "id": 4,
                        "name": "6 CLEAN WATER AND SANITATION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-6.png"
                    },
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 7,
                        "name": "14 LIFE BELOW WATER",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-14.png"
                    }
                ]
            },
            {
                "id": 15,
                "name": "Certified Natural",
                "description": "The product is certified natural and has been verified by a certification body to meet standards.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/Certified-Natural.svg",
                "bullet_points": null,
                "goals": []
            },
            {
                "id": 17,
                "name": "Palm Oil Free",
                "description": "Product is certified palm oil free or has no palm-oil derived ingredients in its ingredients list.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/palm-oil-free.svg",
                "bullet_points": "<ul><li>Certifications: The Orangutan Alliance International Palm Oil Free.</li><li>Ingredient checks, if not certified.</li></ul>",
                "goals": [
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    },
                    {
                        "id": 8,
                        "name": "15 LIFE ON LAND",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-15.png"
                    }
                ]
            },
            {
                "id": 14,
                "name": "Non GMO",
                "description": "The brand or product is certified organic or certified as having no genetically modified organisms (GMOs).",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/non-gmo.svg",
                "bullet_points": null,
                "goals": []
            },
            {
                "id": 13,
                "name": "Certified Organic",
                "description": "The brand or product is certified organic and has been verified by a certification body to meet standards.",
                "image_url": "https://ecowiser-brand-assessment.s3.amazonaws.com/badges/certified-organic.svg",
                "bullet_points": null,
                "goals": []
            }
        ]
    },
    {
        "id": 6,
        "name": "Healthy Living",
        "color": "#E7F6F9",
        "badges": [
            {
                "id": 21,
                "name": "Certified Organic",
                "description": "The brand or product is certified organic and has been verified by a certification body to meet standards.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Certified-Organic.svg",
                "bullet_points": "<ul><li>Certifications: Organic Content Standard (OCS); Global Organic Textile Standard (GOTS); USDA Organic; Canada Organic (Biologique Canada); EU Organic Label; ACO Certified Organic; ECOCERT COSMOS Organic; NSF/ANSI 305 Organic; Soil Association Organic; NATRUE; Quality Assurance International (QAI)</li></ul>",
                "goals": []
            },
            {
                "id": 22,
                "name": "Non GMO",
                "description": "The brand or product is certified organic or certified as having no genetically modified organisms (GMOs).",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Non-GMO.svg",
                "bullet_points": "<ul><li>Certifications: USDA Organic; Canada Organic (Biologique Canada); EU Organic Label; ACO Certified Organic; NSF/ANSI 305 Organic; Soil Association Organic; Quality Assurance International (QAI)</li></ul>",
                "goals": []
            },
            {
                "id": 23,
                "name": "Certified Natural",
                "description": "The product is certified natural and has been verified by a certification body to meet standards.",
                "image_url": "https://wiser.eco/wp-content/uploads//2023/09/Certified-Natural.svg",
                "bullet_points": "<ul><li>Certifications: BDIH Certified Natural; USDA Certified Biobased Product; COSMOS Natural; Natural Products Association Certified</li></ul>",
                "goals": [
                    {
                        "id": 2,
                        "name": "2 Zero Hunger",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-2.png"
                    },
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    },
                    {
                        "id": 4,
                        "name": "6 CLEAN WATER AND SANITATION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-6.png"
                    },
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    },
                    {
                        "id": 7,
                        "name": "14 LIFE BELOW WATER",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-14.png"
                    },
                    {
                        "id": 8,
                        "name": "15 LIFE ON LAND",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-15.png"
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "name": "Clean Formulation",
        "color": "#E7F6F9",
        "badges": [
            {
                "id": 24,
                "name": "Non Toxic",
                "description": "Product is free from harmful and toxic substances that could pose risks to human health or the environment.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Non-Toxic.svg",
                "bullet_points": "<ul><li>Certifications/Standards: Environmental Working Group (EWG) Verified; Made Safe Certified</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    },
                    {
                        "id": 4,
                        "name": "6 CLEAN WATER AND SANITATION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-6.png"
                    },
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 7,
                        "name": "14 LIFE BELOW WATER",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-14.png"
                    }
                ]
            },
            {
                "id": 25,
                "name": "Palm Oil Free",
                "description": "Product is certified palm oil free or has no palm-oil derived ingredients in its ingredients list.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Palm-Oil-Free.svg",
                "bullet_points": "<ul><li>Certifications: The Orangutan Alliance International Palm Oil Free.</li><li>Ingredient checks, if not certified.</li></ul>",
                "goals": [
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    },
                    {
                        "id": 8,
                        "name": "15 LIFE ON LAND",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-15.png"
                    }
                ]
            },
            {
                "id": 26,
                "name": "Petrochemical Free",
                "description": "Product has no petrochemical derived ingredients in its ingredients list.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Petrochemical-Free.svg",
                "bullet_points": "<ul><li>Ingredient checks for petrochemical-derived ingredients.</li></ul>",
                "goals": [
                    {
                        "id": 5,
                        "name": "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-12-1.png"
                    },
                    {
                        "id": 6,
                        "name": "13 CLIMATE ACTION",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-13-1.png"
                    }
                ]
            },
            {
                "id": 27,
                "name": "Paraben Free",
                "description": "Product has no parabens, a group of chemicals widely used as artificial preservatives.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Paraben-Free.svg",
                "bullet_points": "<ul><li>Ingredient checks for parabens.</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    }
                ]
            },
            {
                "id": 28,
                "name": "Sulfate Free",
                "description": "Product has no harsh cleansing agents.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Sulfate-Free.svg",
                "bullet_points": "<ul><li>Ingredient checks for sulfates.</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    }
                ]
            },
            {
                "id": 29,
                "name": "Fragrance Free",
                "description": "Product is unscented and has no synthetic/natural fragrances in the ingredients list.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Fragrance-Free.svg",
                "bullet_points": "<ul><li>Ingredient checks for fragrances.</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    }
                ]
            },
            {
                "id": 30,
                "name": "Phthalate Free",
                "description": "Product has no artificial fragrance additives.",
                "image_url": "https://wiser.eco/wp-content/uploads/2023/09/Phthalate-Free.svg",
                "bullet_points": "<ul><li>Ingredient checks for phthalates.</li></ul>",
                "goals": [
                    {
                        "id": 3,
                        "name": "3 GOOD HEALTH AND WELL-BEING",
                        "image_url": "https://wiser.eco/wp-content/uploads/2023/09/E_SDG_Icons-3.png"
                    }
                ]
            }
        ]
    }
];
