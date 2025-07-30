import React, { useState } from "react";

// Example hierarchical data
const locations = [
    {
        region: "Dodoma",
        districts: [
            {
                name: "Kongwa",
                councils: ["Kongwa DC", "Kongwa MC", "Mpwapwa DC"]
            },
            {
                name: "Chamwino",
                councils: ["Chamwino DC", "Bahati DC"]
            }
        ]
    },
    {
        region: "Mwanza",
        districts: [
            {
                name: "Nyamagana",
                councils: ["Nyamagana MC", "Magu DC"]
            },
            {
                name: "Ilemela",
                councils: ["Ilemela MC", "Misungwi DC"]
            }
        ]
    },
    {
        region: "Mbeya",
        districts: [
            {
                name: "Mbeya Urban",
                councils: ["Mbeya City Council"]
            },
            {
                name: "Mbeya Rural",
                councils: ["Mbeya DC", "Rungwe DC"]
            }
        ]
    },
    {
        region: "Arusha",
        districts: [
            {
                name: "Arusha",
                councils: ["Arusha DC", "Arusha CC", "Longido DC"]
            },
            {
                name: "Monduli",
                councils: ["Monduli DC", "Karatu DC"]
            }
        ]
    },
    {
        region: "Tanga",
        districts: [
            {
                name: "Tanga",
                councils: ["Tanga CC", "Handeni DC", "Korogwe DC"]
            },
            {
                name: "Mwanga",
                councils: ["Mwanga DC", "Lushoto DC"]
            }
        ]
    },
    {
        region: "Mtwara",
        districts: [
            {
                name: "Mtwara",
                councils: ["Mtwara CC", "Mtwara DC", "Tandahimba DC"]
            },
            {
                name: "Masasi",
                councils: ["Masasi DC", "Newala DC"]
            }
        ]
    },
    {
        region: "Ruvuma",
        districts: [
            {
                name: "Songea",
                councils: ["Songea MC", "Songea DC", "Namtumbo DC"]
            },
            {
                name: "Mbinga",
                councils: ["Mbinga DC", "Tunduru DC"]
            }
        ]
    },
    {
        region: "Lindi",
        districts: [
            {
                name: "Lindi",
                councils: ["Lindi MC", "Lindi DC", "Nachingwea DC"]
            },
            {
                name: "Ruangwa",
                councils: ["Ruangwa DC", "Liuliwa DC"]
            }
        ]
    },
    {
        region: "Morogoro",
        districts: [
            {
                name: "Morogoro",
                councils: ["Morogoro MC", "Morogoro DC", "Mvomero DC"]
            },
            {
                name: "Kilosa",
                councils: ["Kilosa DC", "Malinyi DC"]
            }
        ]
    },
    {
        region: "Tabora",
        districts: [
            {
                name: "Tabora",
                councils: ["Tabora MC", "Tabora DC", "Uyui DC"]
            },
            {
                name: "Nzega",
                councils: ["Nzega DC", "Urambo DC"]
            }
        ]
    },
];

// Thematic structure (same as before)
const thematicAreas = [
    {
        id: 1,
        name: "Household Economic Strengthening",
        indicators: [
            {
                id: 101,
                name: "Number of women participating in women's economic empowerment platforms",
                activities: [
                    "Training women and engagement  in agricultural activities",
                    "Facilitate the establishment of women's savings groups",
                    "Follow-ups"]
            },
            {
                id: 102,
                name: "Number of women accessing vocational training, disaggregated by age, disability, and location",
                activities: [
                    "Facilitate the enrollment of women in Vocational Education and Training Authority  (VETA)",
                    "Facilitate the enrollment of women in Vocational Education and Training Authority  (VETA) "
                ]
            },
            {
                id: 103,
                name: "Percentage of women with a bank account access disaggregated by age and location",
                activities: [
                    "Sensitize communities on the importance of women's economic empowerment",
                    "Provide financial literacy training to women",
                ]
            },
            {
                id: 104,
                name: "Number of women-owned SMEs established",
                activities: [
                    "Training women on entrepreneurship skills",
                    "Sensitize communities on the importance of economic empowerment of women",
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Norms and Values",
        indicators: [
            {
                id: 201,
                name: "Number of community members reached through structured awareness-raising sessions on positive social norms",
                activities: [
                    "Providing technical support to community leaders",
                    "Conducting community outreach activities",
                ]
            },
            {
                id: 202,
                name: "Number of villages reached with FGM related campaigns",
                activities: [
                    "Organizing workshops on FGM awareness",
                    "Engaging local artists to create FGM awareness materials",
                    "Collaborating with schools to educate students on FGM",
                    "Supporting local NGOs in FGM campaign initiatives"
                ]
            },
            {
                id: 203,
                name: "Number of men and boys advocating for and championing non-violence and respectful, nurturing and gender equitable relationships in both private and public sphere",
                activities: [
                    "Training community leaders on conflict resolution skills",
                    "Organizing community events to raise awareness on non-violence and respectful relationships",
                    "Training community leaders on non-violence and respectful relationships",
                ]
            }

        ]
    },
    {
        id: 3,
        name: "Parenting, Family Supports and Relationships",
        indicators: [
            {
                id: 301,
                name: "Number of community with ECD centers",
                activities: [
                    "Supporting community leaders in establishing ECD centers",
                    "Providing training on ECD management",
                    "Providing training on ECD curriculum development",
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Implementation and Enforcement of Laws",
        indicators: [
            {
                id: 401,
                name: "Number of law enforcement agents and other personel  trained to deliver equitable and integrated legal services",
                activities: [
                    "Conduct training sessions for law enforcement agents",
                    "Develop training materials on legal service delivery",
                    "Facilitate workshops on integrated legal services",
                    "Collaborate with legal aid organizations for training programs"
                ]
            },
            {
                id: 402,
                name: "Percentage of VAWC cases determined/ concluded by courts within the timelines",
                activities: [
                    "Collaborate with judicial officers to streamline case processes",
                    "Engage community leaders to support timely case resolution",
                    "Develop public awareness campaigns on the importance of swift justice"

                ]
            }
        ]
    },
    {
        id: 5,
        name: "Safe Education/Learning Enviroment and Life Skills",
        indicators: [
            {
                id: 501,
                name: "Number of schools that established confidential and safe reporting mechanisms by type of mechanism",
                activities: [
                    "Training teachers on reporting mechanisms",
                    "Establishing reporting mechanisms in schools",
                    "Conducting awareness campaigns on reporting mechanisms",
                ]
            },
            {
                id: 502,
                name: "Number of schools that established disability-friendly facilities",
                activities: [
                    "Training teachers on disability-friendly facilities",
                    "Establishing disability-friendly facilities in schools",
                    "Conducting awareness campaigns on disability-friendly facilities",
                ]
            },
            {
                id: 503,
                name: "Number of educational institutions  with food programs for students in both primary and secondary schools",
                activities: [
                    "Supporting schools in establishing food programs",
                    "Providing training on nutrition and food security",
                    "Developing educational materials on food security",
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Safe Environment in Public Spaces",
        indicators: [
            {
                id: 601,
                name: "Number of VAWC cases committed in public",
                activities: [
                    "Coordination with law enforcement agencies",
                    "Public awareness campaigns",
                ]
            },
            {
                id: 602,
                name: "Percentage of Registered Public Spaces with Gender Desks",
                activities: [
                    "Establishment of gender desks",
                    "Training of gender desk officers",
                ]
            },
            {
                id: 603,
                name: "Percentage of villages with bylaws to prevent VAWC",
                activities: [
                    "Development of bylaws to prevent VAWC",
                    "Training of local government officials on VAWC prevention",
                ]
            }
        ]
    },
    {
        id: 7,
        name: "Response and Supportive Services",
        indicators: [
            {
                id: 701,
                name: "Number of Women who have experienced violence and seek help",
                activities: [
                    "Providing psycho-social support",
                    "Providing access to legal and health services",
                ]
            },
            {
                id: 702,
                name: "Number of children experienced sexual violence and seek help",
                activities: [
                    "Providing access to legal and health services",
                    "Connecting survivors to support services",
                ]
            },
            {
                id: 703,
                name: "Proportion of healthcare facilities offering specialized VAWC services",
                activities: [
                    "Development of VAWC services",
                    "Training of healthcare providers",
                ]
            }
        ]
    },
    {
        id: 8,
        name: "Coordination, Monitoring and Evaluation",
        indicators: [
            {
                id: 801,
                name: "Percentage of NPA VAWC Coordinator's capacitated to coordinate and report on implement action on VAWC",
                activities: [
                    "Conduct training sessions for coordinators",
                    "Develop reporting guidelines",
                    "Facilitate workshops on coordination strategies",
                ]
            },
            {
                id: 802,
                name: "Budgetary allocation for VAWC",
                activities: [
                    "Conduct budgeting and monitoring",
                    "Develop reporting guidelines",
                    "Facilitate workshops on budgeting strategies",
                ]
            }

        ]
    }


];

export default function DataCollectionForm() {
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCouncil, setSelectedCouncil] = useState("");

    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedIndicator, setSelectedIndicator] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [entries, setEntries] = useState([]);

    const handleAddDataFields = () => {
        const newFields = selectedActivities.map((activity) => ({
            area: selectedArea?.name,
            indicator: selectedIndicator?.name,
            activity,
            value: ""
        }));
        setEntries((prev) => [...prev, ...newFields]);
    };

    const updateValue = (index, val) => {
        const updated = [...entries];
        updated[index].value = val;
        setEntries(updated);
    };

    const updateFunds = (index, val) => {
        const updated = [...entries];
        updated[index].funds = val;
        setEntries(updated);
    };

    const updateFundSource = (index, val) => {
        const updated = [...entries];
        updated[index].fundSource = val;
        setEntries(updated);
    };


    const handleSubmit = () => {
        const payload = {
            region: selectedRegion,
            district: selectedDistrict,
            council: selectedCouncil,
            data: entries
        };
        console.log("Submitted payload:", payload);
        alert("Data submitted successfully!");
    };

    const availableDistricts = locations.find((r) => r.region === selectedRegion)?.districts || [];
    const availableCouncils =
        availableDistricts.find((d) => d.name === selectedDistrict)?.councils || [];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Data Entry Form</h2>

            <div className="flex min-h-screen font-sans bg-gray-100 small">
                {/* Sidebar */}
                <aside className="w-96 bg-white shadow-lg border-r p-6 overflow-y-auto">
                    {/* Region */}
                    <div className="mb-5 text-sm">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 fs-6 text-xs"
                            value={selectedRegion}
                            onChange={(e) => {
                                setSelectedRegion(e.target.value);
                                setSelectedDistrict("");
                                setSelectedCouncil("");
                            }}
                        >
                            <option value="">Select Region</option>
                            {locations.map((r) => (
                                <option key={r.region} value={r.region} className="small">
                                    {r.region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    {selectedRegion && (
                        <div className="mb-5 text-sm">
                            <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
                            <select
                                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs"
                                value={selectedDistrict}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                    setSelectedCouncil("");
                                }}
                            >
                                <option value="">Select District</option>
                                {availableDistricts.map((d) => (
                                    <option key={d.name} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}


                    {/* Council */}
                    {selectedDistrict && (
                        <div className="mb-5 text-sm">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Council</label>
                            <select
                                className="w-full border border-gray-300 text-xs rounded px-3 py-2"
                                value={selectedCouncil}
                                onChange={(e) => setSelectedCouncil(e.target.value)}
                            >
                                <option value="">Select Council</option>
                                {availableCouncils.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Thematic Area */}
                    <div className="mb-5 text-sm">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Thematic Area</label>
                        <select
                            className="w-full border text-xs border-gray-300 rounded px-3 py-2"
                            onChange={(e) => {
                                const area = thematicAreas.find((a) => a.id === parseInt(e.target.value));
                                setSelectedArea(area);
                                setSelectedIndicator(null);
                                setSelectedActivities([]);
                            }}
                        >
                            <option value="">Select Area</option>
                            {thematicAreas.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Indicator */}
                    {selectedArea && (
                        <div className="mb-5 text-sm">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Indicator</label>
                            <select
                                className="w-full border text-xs border-gray-300 rounded px-3 py-2"
                                onChange={(e) => {
                                    const ind = selectedArea.indicators.find(
                                        (i) => i.id === parseInt(e.target.value)
                                    );
                                    setSelectedIndicator(ind);
                                    setSelectedActivities([]);
                                }}
                            >
                                <option value="">Select Indicator</option>
                                {selectedArea.indicators.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Activities */}
                    {selectedIndicator && (
                        <div className="mb-5 text-sm">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Activities</label>
                            <select
                                multiple
                                className="w-full border text-xs border-gray-300 rounded px-3 py-2 h-32"
                                value={selectedActivities}
                                onChange={(e) =>
                                    setSelectedActivities(Array.from(e.target.selectedOptions, (opt) => opt.value))
                                }
                            >
                                {selectedIndicator.activities.map((act, idx) => (
                                    <option key={idx} value={act}>
                                        {act}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Add Button */}
                    {selectedActivities.length > 0 && (
                        <button
                            onClick={handleAddDataFields}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Add Data Fields
                        </button>
                    )}
                </aside>

                {/* Main Panel */}
                <main className="flex-1 px-10 overflow-y-auto">
                    {entries.length === 0 ? (
                        <p></p>

                        // <p className="text-gray-500">No data fields added yet.</p>
                    ) : (
                        <div className="px-6 py-8 bg-gray-50 min-h-screen">
                            {/* <h1 className="text-xl font-extrabold text-center mb-10 tracking-tight">
                                Activity Data Entry
                            </h1> */}

                            <div className="">
                                {entries.map((entry, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-6 space-y-4"
                                    >
                                        <div className="space-y-1">
                                            <h2 className="text-lg font-semibold text-gray-700">Activity #{idx + 1}</h2>
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold text-gray-600"></span> {entry.area}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold text-gray-600">Indicator:</span> {entry.indicator}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold text-gray-600">Activity:</span> {entry.activity}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                placeholder="Brief description..."
                                                value={entry.description}
                                                onChange={(e) => updateDescription(idx, e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., 1500"
                                                value={entry.value}
                                                onChange={(e) => updateValue(idx, e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Funds Used</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., 10,000,000"
                                                value={entry.funds}
                                                onChange={(e) => updateFunds(idx, e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Source of Funds</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Government, NGO, etc."
                                                value={entry.fundSource}
                                                onChange={(e) => updateFundSource(idx, e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    )}

                    {/* Submit Button */}
                    {entries.length > 0 && (
                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
                            >
                                Submit Data
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
