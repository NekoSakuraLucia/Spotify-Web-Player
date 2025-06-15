'use client';
// Next
import { useRouter } from 'next/navigation';

// Icon
import { FaSpotify } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';

// Motion
import { motion, AnimatePresence } from 'framer-motion';

const AuthenticationModal = () => {
    const router = useRouter();

    return (
        <AnimatePresence>
            <motion.div
                className='fixed inset-0 z-50 flex items-center justify-center p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className='absolute inset-0 bg-black/60 backdrop-blur-md'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                <motion.div
                    className='relative w-full max-w-md bg-gradient-to-b from-neutral-900 to-black 
                        rounded-xl border border-neutral-800 shadow-2xl'
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                >
                    {/* Warning Icon */}
                    <motion.div
                        className='absolute -top-16 left-1/2 -translate-x-1/2 p-4 
                            bg-gradient-to-b from-neutral-900 to-black rounded-full 
                            border border-neutral-800 shadow-xl'
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            delay: 0.2,
                            bounce: 0.5,
                        }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        >
                            <IoWarningOutline className='w-12 h-12 text-yellow-500' />
                        </motion.div>
                    </motion.div>

                    <div className='p-8 pt-12'>
                        {/* Header */}
                        <div className='text-center mb-8 space-y-4'>
                            <motion.h3
                                className='text-2xl font-bold text-white'
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                ต้องเข้าสู่ระบบก่อน
                            </motion.h3>
                            <motion.p
                                className='text-base text-neutral-400'
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                กรุณาเข้าสู่ระบบด้วย Spotify
                                <br />
                                เพื่อเข้าถึงเนื้อหาทั้งหมด
                            </motion.p>
                        </div>

                        {/* Action Button */}
                        <motion.button
                            className='relative w-full flex items-center justify-center gap-3 
                                bg-white hover:bg-neutral-100 active:bg-neutral-200
                                text-black text-lg font-semibold px-6 py-4 rounded-full 
                                shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer'
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/login')}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                <FaSpotify className='w-7 h-7 text-[#1DB954]' />
                            </motion.div>
                            <span>เข้าสู่ระบบ</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export { AuthenticationModal };
